import NewPresenter from "./new-story-presenter";
import { convertBase64ToBlob } from "../../utils";
import * as NarativaAPI from "../../data/api";
import { generateLoaderAbsoluteTemplate } from "../../templates";
import Camera from "../../utils/camera";
import Map from "../../utils/map";

export default class NewStory {
  #presenter;
  #form;
  #camera;
  #isCameraOpen = false;
  #takenDocumentations = [];
  #map = null;

  async render() {
    return `
      <section>
        <div class="new-story__header">
          <div class="container">
            <h1 class="new-story__header__title">Buat Story Baru</h1>
            <p class="new-story__header__description">
              Silakan lengkapi formulir di bawah untuk membuat story baru anda.<br>
            </p>
          </div>
        </div>
      </section>
  
      <section class="container">
        <div class="new-form__container">
          <form id="new-form" class="new-form">
            <div class="form-control">
              <label for="title-input" class="new-form__title__title">Judul Story</label>
  
              <div class="new-form__title__container">
                <input
                  id="title-input"
                  name="title"
                  placeholder="Masukkan judul laporan"
                  aria-describedby="title-input-more-info"
                >
              </div>
            </div>
      
            <div class="form-control">
              <label for="description-input" class="new-form__description__title">Deskripsi</label>
  
              <div class="new-form__description__container">
                <textarea
                  id="description-input"
                  name="description"
                  placeholder="Masukkan deskripsi story. Anda dapat menjelaskan apa kejadiannya, dimana, kapan, dll."
                ></textarea>
              </div>
            </div>
            <div class="form-control">
              <label for="documentations-input" class="new-form__documentations__title">Dokumentasi</label>
              <div id="documentations-more-info">Dokumentasikan kisahmu.</div>
  
              <div class="new-form__documentations__container">
                <div class="new-form__documentations__buttons">
                  <button id="documentations-input-button" class="btn btn-outline" type="button">
                    Ambil Gambar
                  </button>
                  <input
                    id="documentations-input"
                    name="documentations"
                    type="file"
                    accept="image/*"
                    multiple
                    hidden="hidden"
                    aria-multiline="true"
                    aria-describedby="documentations-more-info"
                  >
                  <button id="open-documentations-camera-button" class="btn btn-outline" type="button">
                    Buka Kamera
                  </button>
                </div>
                <div id="camera-container" class="new-form__camera__container">
                  <video id="camera-video" class="new-form__camera__video">
                    Video stream not available.
                  </video>
                  <canvas id="camera-canvas" class="new-form__camera__canvas"></canvas>
  
                  <div class="new-form__camera__tools">
                    <select id="camera-select"></select>
                    <div class="new-form__camera__tools_buttons">
                      <button id="camera-take-button" class="btn" type="button">
                        Ambil Gambar
                      </button>
                    </div>
                  </div>
                </div>
                <ul id="documentations-taken-list" class="new-form__documentations__outputs"></ul>
              </div>
            </div>
            <div class="form-control">
              <div class="new-form__location__title">Lokasi</div>
  
              <div class="new-form__location__container">
                <div class="new-form__location__map__container">
                  <div id="map" class="new-form__location__map"></div>
                  <div id="map-loading-container"></div>
                </div>
                <div class="new-form__location__lat-lng">
                  <input type="number" name="lat" value="-6.175389" readonly>
                  <input type="number" name="lon" value="106.827139" readonly>
                </div>
              </div>
            </div>
            <div class="form-buttons">
              <span id="submit-button-container">
                <button class="btn" type="submit">Buat Story</button>
              </span>
              <a class="btn btn-outline" href="#/">Batal</a>
            </div>
          </form>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new NewPresenter({
      view: this,
      model: NarativaAPI,
    });
    this.#takenDocumentations = [];

    this.#presenter.showNewFormMap();
    this.#setupForm();
  }

  #setupForm() {
    this.#form = document.getElementById("new-form");
    this.#form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const descriptionEl = this.#form.elements.namedItem("description");
      const latEl = this.#form.elements.namedItem("lat");
      const lonEl = this.#form.elements.namedItem("lon");

      const photo = this.#takenDocumentations[0]?.blob;

      if (!photo) {
        alert("Silakan ambil atau unggah gambar terlebih dahulu.");
        return;
      }

      const data = {
        description: descriptionEl.value,
        photo,
        lat: latEl.value,
        lon: lonEl.value,
      };

      await this.#presenter.postNewStory(data);
    });

    document
      .getElementById("documentations-input")
      .addEventListener("change", async (event) => {
        const insertingPicturesPromises = Object.values(event.target.files).map(
          async (file) => {
            return await this.#addTakenPicture(file);
          }
        );
        await Promise.all(insertingPicturesPromises);

        await this.#populateTakenPictures();
      });

    document
      .getElementById("documentations-input-button")
      .addEventListener("click", () => {
        this.#form.elements.namedItem("documentations-input").click();
      });

    const cameraContainer = document.getElementById("camera-container");
    document
      .getElementById("open-documentations-camera-button")
      .addEventListener("click", async (event) => {
        cameraContainer.classList.toggle("open");
        this.#isCameraOpen = cameraContainer.classList.contains("open");

        if (this.#isCameraOpen) {
          event.currentTarget.textContent = "Tutup Kamera";
          this.#setupCamera();
          await this.#camera.launch();

          return;
        }

        event.currentTarget.textContent = "Buka Kamera";
        this.#camera.stop();
      });
  }

  async initialMap() {
    this.#map = await Map.build("#map", {
      zoom: 15,
      locate: true,
    });

    // titik tengah default
    const centerCoordinate = this.#map.getCenter();
    this.#updateLatLngInput(
      centerCoordinate.latitude,
      centerCoordinate.longitude
    );

    // tambahkan marker draggable
    const draggableMarker = this.#map.addMarker(
      [centerCoordinate.latitude, centerCoordinate.longitude],
      { draggable: true }
    );

    draggableMarker.on("move", (event) => {
      const { lat, lng } = event.target.getLatLng();
      this.#updateLatLngInput(lat, lng);
    });

    this.#map.addMapEventListener("click", (event) => {
      draggableMarker.setLatLng(event.latlng);
      this.#map.changeCamera([event.latlng.lat, event.latlng.lng]);
      this.#updateLatLngInput(event.latlng.lat, event.latlng.lng);
    });
  }
  #updateLatLngInput(lat, lon) {
    this.#form.elements.namedItem("lat").value = lat;
    this.#form.elements.namedItem("lon").value = lon;
  }

  #setupCamera() {
    if (!this.#camera) {
      this.#camera = new Camera({
        video: document.getElementById("camera-video"),
        cameraSelect: document.getElementById("camera-select"),
        canvas: document.getElementById("camera-canvas"),
      });
    }

    this.#camera.addCheeseButtonListener("#camera-take-button", async () => {
      const image = await this.#camera.takePicture();
      await this.#addTakenPicture(image);
      await this.#populateTakenPictures();
    });
  }

  async #addTakenPicture(image) {
    let blob = image;

    if (typeof image === "string" || image instanceof String) {
      blob = await convertBase64ToBlob(image, "image/png");
    }
    // VALIDASI FILE SIZE < 1MB
    if (blob.size > 1024 * 1024) {
      alert(
        "Gambar melebihi 1MB. Silakan unggah ulang dengan ukuran lebih kecil."
      );
      return;
    }

    const newDocumentation = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      blob,
    };
    this.#takenDocumentations = [
      ...this.#takenDocumentations,
      newDocumentation,
    ];
  }

  async #populateTakenPictures() {
    const html = this.#takenDocumentations.reduce(
      (accumulator, picture, currentIndex) => {
        const imageUrl = URL.createObjectURL(picture.blob);
        return accumulator.concat(`
        <li class="new-form__documentations__outputs-item">
          <button type="button" data-deletepictureid="${
            picture.id
          }" class="new-form__documentations__outputs-item__delete-btn">
            <img src="${imageUrl}" alt="Dokumentasi ke-${currentIndex + 1}">
          </button>
        </li>
      `);
      },
      ""
    );

    document.getElementById("documentations-taken-list").innerHTML = html;

    document
      .querySelectorAll("button[data-deletepictureid]")
      .forEach((button) =>
        button.addEventListener("click", (event) => {
          const pictureId = event.currentTarget.dataset.deletepictureid;

          const deleted = this.#removePicture(pictureId);
          if (!deleted) {
            console.log(`Picture with id ${pictureId} was not found`);
          }

          // Updating taken pictures
          this.#populateTakenPictures();
        })
      );
  }

  #removePicture(id) {
    const selectedPicture = this.#takenDocumentations.find((picture) => {
      return picture.id == id;
    });

    // Check if founded selectedPicture is available
    if (!selectedPicture) {
      return null;
    }

    // Deleting selected selectedPicture from takenPictures
    this.#takenDocumentations = this.#takenDocumentations.filter((picture) => {
      return picture.id != selectedPicture.id;
    });

    return selectedPicture;
  }

  storeSuccessfully(message) {
    console.log(message);
    this.clearForm();

    // Redirect page
    location.hash = "/";
  }

  storeFailed(message) {
    alert(message);
  }

  clearForm() {
    this.#form.reset();
  }

  showMapLoading() {
    document.getElementById("map-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideMapLoading() {
    document.getElementById("map-loading-container").innerHTML = "";
  }

  showSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button class="btn" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Buat Story
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button class="btn" type="submit">Buat Story</button>
    `;
  }
}

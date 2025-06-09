import {
  generateLoaderAbsoluteTemplate,
  generateRemoveStoryButtonTemplate,
  generateStoryDetailErrorTemplate,
  generateStoryDetailTemplate,
  generateSaveStoryButtonTemplate,
} from "../../templates";
import { createCarousel } from "../../utils";
import StoryDetailPresenter from "./story-detail-presenter";
import { parseActivePathname } from "../../routes/url-parser";
import Map from "../../utils/map";
import * as NarativaAPI from "../../data/api";
import { saveStory, deleteStory, getAllStories } from "../../utils/db.js";

export default class StoryDetailPage {
  #presenter = null;
  #form = null;
  #map = null;

  async render() {
    return `
      <section>
        <div class="story-detail__container">
          <div id="story-detail" class="story-detail"></div>
          <div id="story-detail-loading-container"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new StoryDetailPresenter(parseActivePathname().id, {
      view: this,
      apiModel: NarativaAPI,
    });

    this.#presenter.showStoryDetail();
  }

  async populateStoryDetailAndInitialMap(message, story) {
    const hasLocation = story.lat !== undefined && story.lon !== undefined;

    // Render template ke DOM
    document.getElementById("story-detail").innerHTML =
      generateStoryDetailTemplate({
        description: story.description,
        photoUrl: story.photoUrl,
        location: {
          lat: story.lat,
          lon: story.lon,
        },
        latitudeLocation: hasLocation ? story.lat : null,
        longitudeLocation: hasLocation ? story.lon : null,
        reporterName: story.name,
        createdAt: story.createdAt,
      });

    // Carousel images
    createCarousel(document.getElementById("images"));

    // Map
    await this.initialMap();
    await this.#presenter.showStoryDetailMap();
    if (this.#map && hasLocation) {
      const reportCoordinate = [story.lat, story.lon];
      const markerOptions = { alt: story.description };
      const popupOptions = { content: story.description };
      this.#map.changeCamera(reportCoordinate);
      this.#map.addMarker(reportCoordinate, markerOptions, popupOptions);
    }

    // Actions buttons
    await this.#presenter.showSaveButton();
  }

  populateStoryDetailError(message) {
    document.getElementById("story-detail").innerHTML =
      generateStoryDetailErrorTemplate(message);
  }

  async initialMap() {
    // TODO: map initialization
    if (document.getElementById("map")?._leaflet_id !== undefined) {
      document.getElementById("map")._leaflet_id = null;
    }
    this.#map = await Map.build("#map", {
      zoom: 15,
    });
  }

  renderSaveButton() {
    console.log("renderSaveButton dipanggil");
    document.getElementById("save-actions-container").innerHTML =
      generateSaveStoryButtonTemplate();

    document
      .getElementById("story-detail-save")
      .addEventListener("click", async () => {
        // Simpan story ke IndexedDB
        await saveStory(this.#presenter.getCurrentStory());
        alert("Cerita disimpan ke bookmark!");
        this.#presenter.showSaveButton();
      });
  }

  renderRemoveButton() {
    console.log("renderRemoveButton dipanggil");
    document.getElementById("save-actions-container").innerHTML =
      generateRemoveStoryButtonTemplate();

    document
      .getElementById("story-detail-remove")
      .addEventListener("click", async () => {
        // Hapus story dari IndexedDB
        await deleteStory(this.#presenter.getCurrentStory().id);
        alert("Cerita dihapus dari bookmark!");
        this.#presenter.showSaveButton();
      });
  }

  showStoryDetailLoading() {
    document.getElementById("story-detail-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideStoryDetailLoading() {
    document.getElementById("story-detail-loading-container").innerHTML = "";
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
        <i class="fas fa-spinner loader-button"></i> Tanggapi
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button class="btn" type="submit">Tanggapi</button>
    `;
  }
}

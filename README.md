# Narativa: Kisah Anda di Peta Dunia

Selamat datang di **Narativa**, sebuah aplikasi web inovatif yang membawa pengalaman berbagi cerita ke tingkat yang lebih mendalam. Bayangkan sebuah platform di mana setiap kisah yang Anda bagikan tidak hanya berupa teks dan gambar, tetapi juga memiliki **jejak lokasi yang tersemat pada peta interaktif**. Dicoding Narativa adalah Single-Page Application (SPA) yang dirancang untuk mewujudkan visi tersebut, dibangun dengan kekuatan Vanilla JavaScript, Webpack, dan beragam Web API modern. Aplikasi ini adalah hasil pengembangan dari kelas **Menjadi Front-End Web Developer Expert** di Dicoding Academy, dengan fokus khusus pada peningkatan pengalaman pengguna (UI/UX).

---

## Fitur Utama yang Membuat Narativa Menonjol

Narativa didukung oleh serangkaian fitur canggih yang dirancang untuk kemudahan dan kenyamanan Anda:

* **Autentikasi Pengguna yang Mulus:** Mulai perjalanan Anda dengan mudah melalui **registrasi** dan **login** yang aman. Status login Anda akan dipertahankan berkat **LocalStorage**, dan setiap perubahan UI akan diperbarui secara **reaktif** tanpa perlu memuat ulang halaman penuh, semua berkat sistem Event Bus yang cerdas.
* **Berbagi Cerita yang Kaya:** Bagikan momen Anda dengan menambahkan **cerita baru** yang mencakup deskripsi wajib dan foto berkualitas tinggi (maksimal 1MB) yang bisa Anda ambil langsung dari kamera atau unggah. Yang menarik, Anda juga memiliki opsi untuk menyertakan **lokasi cerita** Anda pada peta, menambah dimensi visual yang unik.
* **Peta Interaktif Bertenaga:** Lihat cerita Anda hidup di atas peta yang dinamis, didukung oleh **LeafletJS** dan **MapTiler API**. Setiap cerita ditampilkan dengan **marker interaktif** yang dilengkapi popup detail. Ingin menambahkan lokasi? Cukup klik atau geser peta! Anda juga bisa memilih antara tampilan jalanan atau satelit, dengan fitur **lazy loading** untuk pengalaman peta yang lancar.
* **Memanfaatkan Kekuatan Web Modern:** Narativa dibangun dengan fondasi teknologi web terkini, termasuk **Camera Access** (`getUserMedia`), **View Transitions API** untuk transisi halaman yang halus, **Fetch API** untuk komunikasi data yang efisien, **Web Components** seperti `<story-item>` untuk modularitas, dan **LocalStorage** untuk data persisten.
* **Arsitektur Kokoh:** Sebagai **SPA** dengan hash routing, Narativa mengadopsi pola **MVP (Model-View-Presenter)** per halaman, diorganisir dalam modul **ES6**, dan disatukan dengan rapi menggunakan **Webpack bundling**.
* **Prioritas Aksesibilitas:** Kami memastikan Narativa dapat diakses oleh semua orang dengan implementasi **struktur semantik**, **Skip Link**, label form yang jelas, Alt Text untuk gambar, dan penggunaan atribut **ARIA** yang ekstensif (`role`, `aria-live`, `aria-busy`, `aria-describedby`, `aria-invalid`, `aria-label`, dll.). **Manajemen Fokus** yang cermat dan **Outline Fokus Keyboard** yang jelas juga menjadi perhatian utama.
* **Pengalaman Pengguna yang Ditingkatkan:** Nikmati desain **responsif** yang ramah seluler, **indikator loading** visual (spinner) yang informatif, dan **notifikasi Toast** yang muncul dengan elegan untuk pesan sukses atau error. Seluruh tata letak dan spasinya telah disempurnakan untuk tampilan yang lebih profesional dan menarik.

---

## Teknologi di Balik Layar

Narativa ditenagai oleh kombinasi teknologi web standar industri dan library pihak ketiga:

* HTML5, CSS3, JavaScript (ES6+)
* [Dicoding Story API](https://story-api.dicoding.dev/)
* [LeafletJS](https://leafletjs.com/)
* [MapTiler Cloud](https://www.maptiler.com/cloud/) (API Key Peta)
* [Font Awesome](https://fontawesome.com/)
* Webpack, Babel, NPM

---

## Memulai Petualangan Anda dengan Narativa (Lokal)

Tertarik untuk mencoba Narativa di lingkungan lokal Anda? Ikuti langkah-langkah mudah ini:

### Prasyarat

Sebelum memulai, pastikan Anda memiliki:

* **Node.js:** Disarankan versi LTS terbaru.
* **NPM:** Biasanya sudah terinstal bersama Node.js.
* **Akun MapTiler Cloud:** Anda bisa mendaftar secara gratis untuk mendapatkan API Key peta.

### Instalasi dan Menjalankan Proyek

1.  **Unduh atau Clone Proyek:** Dapatkan kode sumber Narativa ke komputer Anda.
2.  **Instal Dependencies:** Buka terminal di direktori proyek dan jalankan:
    ```bash
    npm install
    ```
3.  **Konfigurasi API Key Peta:** Ini langkah penting!
    * Ambil **API Key** unik Anda dari dashboard MapTiler Cloud.
    * Buka file **`STUDENT.txt`** dan **`src/scripts/config.js`**.
    * Ganti *placeholder* `MASUKKAN_API_KEY_MAP_ANDA_DISINI` (atau `ycYnjQnQjaybWkdGWhCZ` jika sudah ada) dengan **API Key MapTiler Anda yang valid** di **kedua** file tersebut.
4.  **Jalankan Development Server:**
    ```bash
    npm run start-dev
    ```
5.  **Buka Aplikasi:** Buka browser favorit Anda dan navigasikan ke `http://localhost:9000` (atau periksa terminal Anda untuk port yang berbeda).

---

## Produksi dan Penyebaran

Untuk menyiapkan Narativa dalam mode produksi:

1.  **Build Aplikasi:**
    ```bash
    npm run build
    ```
    Hasil *build* akan tersedia di folder `dist/`.
2.  **Sajikan Secara Lokal (Opsional):**
    ```bash
    npm run serve
    ```
    Kemudian akses melalui `http://localhost:8080` atau alamat yang ditampilkan.

---

Dengan Narativa, setiap cerita memiliki tempatnya di dunia. Selamat berbagi!

export default class AboutPage {
  constructor() {
    this.title = "Tentang Narativa - Perjalanan Kami";
  }
  async render() {
    const currentTime = new Date().toLocaleString("id-ID", {
      dateStyle: "long",
      timeStyle: "short",
    });
    return `
      <section class="container about-page-pro" aria-labelledby="about-heading">
        <style>
          /* Global styles for a cleaner look */
          .about-page-pro {
            padding-block: var(--spacing-xxl) var(--spacing-xxxl);
            max-width: 1000px; /* Lebih lebar untuk desain baru */
            margin-bottom: var(--spacing-xl);
            background-color: var(--card-bg);
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow-lg); /* Bayangan lebih dalam */
            border: 1px solid var(--border-color);
            padding-inline: var(--spacing-xxl); /* Padding samping lebih besar */
            display: flex;
            flex-direction: column;
            gap: var(--spacing-xxxl); /* Jarak antar section yang besar */
          }

          /* Main Heading */
          .about-page-pro h1 {
            text-align: center;
            color: var(--dark-text);
            font-size: 3.5rem; /* Judul sangat besar */
            margin-bottom: var(--spacing-lg);
            letter-spacing: -0.04em;
            font-weight: var(--font-weight-extrabold); /* Sangat bold */
            position: relative;
            padding-bottom: var(--spacing-md);
          }
          .about-page-pro h1::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 4px;
            background-color: var(--primary-color);
            border-radius: 2px;
          }

          /* Subtitle */
          .about-page-pro .page-subtitle {
            font-size: 1.35rem; /* Subtitle lebih besar */
            color: var(--medium-text);
            margin-bottom: var(--spacing-xxl); /* Margin bawah lebih besar */
            text-align: center;
            font-style: normal;
            font-weight: var(--font-weight-normal);
            max-width: 900px;
            margin-inline: auto;
            line-height: 1.6;
          }

          /* Section Titles (h2) */
          .about-page-pro h2 {
            margin-top: 0; /* Diatur oleh gap parent */
            margin-bottom: var(--spacing-lg);
            font-size: 2.5rem; /* H2 lebih besar */
            color: var(--primary-color-dark);
            display: flex;
            align-items: center;
            gap: 20px; /* Jarak ikon dan teks */
            font-weight: var(--font-weight-bold);
            letter-spacing: -0.02em;
            text-align: left; /* Default text-align */
          }
          .about-page-pro h2 .fa-icon {
            color: var(--primary-color);
            font-size: 1.1em;
            background-color: var(--primary-color-light); /* Latar belakang ikon */
            padding: var(--spacing-sm);
            border-radius: var(--border-radius-md);
          }

          /* Paragraphs */
          .about-page-pro p {
            margin-bottom: var(--spacing-md);
            line-height: 1.8;
            color: var(--dark-text);
            font-size: 1.1rem; /* Ukuran font lebih besar */
          }
          .about-page-pro strong {
            color: var(--primary-color);
            font-weight: var(--font-weight-semibold);
          }
          .about-page-pro code {
            background-color: var(--light-bg);
            padding: 4px 8px;
            border-radius: var(--border-radius-sm);
            font-family: 'Fira Code', monospace;
            font-size: 0.95em;
            border: 1px solid var(--border-color);
            color: var(--secondary-color-dark); /* Warna kode lebih kontras */
          }

          /* Feature List (new design for ul) */
          .about-page-pro .feature-list {
            list-style: none;
            padding-left: 0;
            margin-bottom: var(--spacing-xxl);
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Kolom adaptif */
            gap: var(--spacing-lg); /* Jarak antar fitur */
          }
          .about-page-pro .feature-list li {
            background-color: var(--light-bg); /* Latar belakang item fitur */
            padding: var(--spacing-lg);
            border-radius: var(--border-radius-md);
            box-shadow: var(--shadow-xs); /* Bayangan kecil */
            display: flex;
            align-items: flex-start;
            gap: var(--spacing-md);
            line-height: 1.6;
            color: var(--dark-text);
            font-size: 1rem;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            border: 1px solid var(--border-color);
          }
          .about-page-pro .feature-list li:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-sm);
          }
          .about-page-pro .feature-list li .feature-icon {
            color: var(--primary-color);
            font-size: 1.8rem;
            margin-top: 5px;
          }

         .about-page-pro .tech-stack-section {
  padding: var(--spacing-xxl) var(--spacing-xl); /* Padding */
  margin-top: var(--spacing-xxxl); /* Margin atas */
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.about-page-pro .tech-stack-section h2 {
  text-align: center;
  margin-bottom: var(--spacing-xxl);
}

.about-page-pro .tech-stack-section h2 .fa-icon {
  background-color: var(--primary-color-light);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-xs);
}

.about-page-pro .tech-stack-section dl {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, auto)); /* Lebar min 280px, tinggi otomatis */
  gap: var(--spacing-xl); /* Jarak antar item */
}

.about-page-pro .tech-stack-section dt {
  font-weight: var(--font-weight-bold);
  color: var(--secondary-color-dark);
  font-size: 1.3rem;
  margin-top: 0;
  margin-bottom: var(--spacing-sm);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--primary-color-light);
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  justify-content: center; /* Tengahkan dt */
  text-align: center; /* Tengahkan teks dt */
}

.about-page-pro .tech-stack-section dt::before {
  content: '\\f013'; /* Ikon cog */
  font-family: 'Font Awesome 6 Free';
  font-weight: 900;
  color: var(--primary-color);
  font-size: 1.2em;
}

.about-page-pro .tech-stack-section dd {
  background-color: var(--light-bg);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  color: var(--dark-text);
  font-size: 1.05rem;
  line-height: 1.7;
  margin: 0; /* Reset margin */
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md); /* Jarak antar konten dd */
}

.about-page-pro .tech-stack-section dd ul {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
}

.about-page-pro .tech-stack-section dd ul li {
  padding-left: 20px;
  position: relative;
  color: var(--medium-text);
  line-height: 1.6;
}

.about-page-pro .tech-stack-section dd ul li::before {
  content: '\\f101'; /* Ikon angle right */
  font-family: 'Font Awesome 6 Free';
  font-weight: 900;
  color: var(--primary-color);
  font-size: 0.8em;
  position: absolute;
  left: 0;
  top: 0.3em;
}



          /* Developer Section */
          .about-page-pro .developer-section {
            padding: var(--spacing-xxl) var(--spacing-xl);
            background-color: var(--dark-bg); /* Latar belakang gelap */
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow-lg);
            color: var(--white-color); /* Teks putih */
            text-align: center;
            border: 1px solid var(--border-color-dark);
          }
          .about-page-pro .developer-section h2 {
            border-bottom: none;
            justify-content: center;
            margin-bottom: var(--spacing-md);
            font-size: 2.8rem; /* H2 developer lebih besar */
            color: var(--white-color);
          }
          .about-page-pro .developer-section h2 .fa-icon {
            background-color: rgba(255, 255, 255, 0.1); /* Latar belakang ikon transparan */
            color: var(--white-color);
          }
          .about-page-pro .developer-intro {
            font-size: 1.2rem; /* Font intro lebih besar */
            max-width: 800px;
            margin-inline: auto;
            margin-bottom: var(--spacing-lg);
            color: var(--light-text); /* Teks lebih terang */
            line-height: 1.8;
          }
          .about-page-pro .developer-intro strong {
            color: var(--accent-color); /* Warna aksen untuk nama */
          }
          .about-page-pro .social-links {
            display: flex;
            justify-content: center;
            gap: var(--spacing-xxl); /* Jarak sosial media lebih besar */
            list-style: none;
            padding: 0;
            margin-top: var(--spacing-lg);
          }
          .about-page-pro .social-links a {
            font-size: 3rem; /* Ikon sosial sangat besar */
            color: var(--light-text);
            transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;
            display: inline-block;
          }
          .about-page-pro .social-links a:hover, .about-page-pro .social-links a:focus {
            color: var(--accent-color); /* Warna aksen saat hover */
            transform: scale(1.25) translateY(-5px);
          }

          /* Final Note */
          .about-page-pro .final-note {
            margin-top: var(--spacing-xxxl);
            font-style: normal;
            color: var(--medium-text);
            text-align: center;
            font-size: 1.05rem;
            line-height: 1.7;
            padding-top: var(--spacing-xl);
            border-top: 1px solid var(--border-color);
          }
          .about-page-pro .last-updated {
            display: block;
            font-size: 0.9rem;
            color: var(--light-text);
            margin-top: var(--spacing-md);
          }

         /* Responsive adjustments */
@media screen and (min-width: 768px) {
  .about-page-pro .tech-stack-section dl {
    grid-template-columns: repeat(2, 1fr); /* 2 kolom untuk tablet */
  }
  .about-page-pro .tech-stack-section dt {
    text-align: left; /* Kembalikan ke kiri untuk tablet */
    justify-content: flex-start; /* Align kiri untuk tablet */
  }
}

@media screen and (min-width: 1024px) {
  .about-page-pro .tech-stack-section dl {
    grid-template-columns: repeat(4, 1fr); /* 4 kolom untuk desktop */
  }
}

          @media screen and (max-width: 767px) {
            .about-page-pro {
              padding-inline: var(--spacing-lg);
              gap: var(--spacing-xxl);
            }
            .about-page-pro h1 {
              font-size: 2.8rem;
            }
            .about-page-pro h2 {
              font-size: 2rem;
              flex-direction: column; /* Ikon di atas teks untuk mobile */
              gap: var(--spacing-sm);
              text-align: center;
            }
            .about-page-pro h2 .fa-icon {
              font-size: 1.5em;
              padding: var(--spacing-md);
            }
            .about-page-pro .page-subtitle,
            .about-page-pro .developer-intro,
            .about-page-pro p {
              font-size: 1rem;
            }
            .about-page-pro .feature-list li {
              flex-direction: column;
              align-items: center;
              text-align: center;
            }
            .about-page-pro .feature-list li .feature-icon {
              margin-bottom: var(--spacing-sm);
            }
            .about-page-pro .developer-section h2 {
              font-size: 2.2rem;
            }
            .about-page-pro .social-links a {
              font-size: 2.5rem;
            }
             .about-page-pro .tech-stack-section h2 {
                flex-direction: column;
                gap: var(--spacing-sm);
                text-align: center;
            }
            .about-page-pro .tech-stack-section dt {
                font-size: 1.15rem;
                text-align: center;
                justify-content: center; /* dt di tengah untuk mobile */
            }
          }
        </style>

        <h1 id="about-heading">Cerita Kami di Narativa</h1>
        <p class="page-subtitle">
          Selamat datang di Narativa, tempat di mana setiap momen berharga menemukan rumah. Kami percaya bahwa setiap orang memiliki cerita yang layak dibagikan.
        </p>

        <section class="what-we-do-section" aria-labelledby="what-we-do-heading">
          <h2 id="what-we-do-heading"><i class="fas fa-lightbulb fa-icon" aria-hidden="true"></i> Visi Kami</h2>
          <p>
            Narativa lahir dari keinginan untuk menciptakan platform yang **intuitif, cepat, dan handal** untuk berbagi pengalaman hidup. Kami ingin Anda bisa dengan mudah mengabadikan petualangan, pemikiran, dan momen sehari-hari, lalu membagikannya kepada dunia atau menyimpannya untuk diri sendiri.
          </p>
          <p>
            Lebih dari itu, Narativa dirancang sebagai **aplikasi web progresif (PWA)**, memastikan pengalaman pengguna yang mulus dan andal di berbagai perangkat, bahkan saat koneksi internet tidak stabil. Ini adalah langkah kami untuk menghadirkan web yang lebih baik dan lebih mudah diakses.
          </p>
        </section>

        <section class="features-section" aria-labelledby="features-heading">
          <h2 id="features-heading"><i class="fas fa-grip-vertical fa-icon" aria-hidden="true"></i> Apa yang Bisa Anda Lakukan?</h2>
          <ul class="feature-list">
            <li>
              <i class="fas fa-pencil-alt feature-icon" aria-hidden="true"></i>
              <div>
                <h3>Bagikan Kisah Anda</h3>
                <p>Tuangkan imajinasi Anda dengan mudah. Tulis cerita, tambahkan foto, dan tentukan lokasi untuk setiap kenangan tak terlupakan.</p>
              </div>
            </li>
            <li>
              <i class="fas fa-map-marked-alt feature-icon" aria-hidden="true"></i>
              <div>
                <h3>Peta Interaktif</h3>
                <p>Visualisasikan tempat cerita Anda terjadi. Gunakan peta LeafletJS untuk menandai lokasi spesifik dan menjelajahinya.</p>
              </div>
            </li>
            <li>
              <i class="fas fa-lock feature-icon" aria-hidden="true"></i>
              <div>
                <h3>Pengalaman Aman</h3>
                <p>Masuk dengan akun Anda untuk sesi yang aman dan personal. Data Anda dilindungi, memastikan privasi terjaga.</p>
              </div>
            </li>
            <li>
              <i class="fas fa-share-alt feature-icon" aria-hidden="true"></i>
              <div>
                <h3>Terhubung & Jelajahi</h3>
                <p>Telusuri cerita dari pengguna lain di linimasa dinamis. Temukan inspirasi dan terhubung dengan komunitas.</p>
              </div>
            </li>
            <li>
              <i class="fas fa-cloud-download-alt feature-icon" aria-hidden="true"></i>
              <div>
                <h3>Akses Offline</h3>
                <p>Simpan cerita favorit Anda secara lokal. Nikmati membaca kapan saja, di mana saja, bahkan tanpa internet.</p>
              </div>
            </li>
            <li>
              <i class="fas fa-mobile-alt feature-icon" aria-hidden="true"></i>
              <div>
                <h3>Desain Responsif</h3>
                <p>Rasakan pengalaman optimal di perangkat apapun. Narativa dirancang untuk adaptasi yang mulus di berbagai ukuran layar.</p>
              </div>
            </li>
          </ul>
        </section>

        <section class="tech-stack-section" aria-labelledby="tech-stack-heading">
          <h2 id="tech-stack-heading"><i class="fas fa-microchip fa-icon" aria-hidden="true"></i> Dibalik Layar: Teknologi Kami</h2>
          <dl>
            <dt>Fondasi Kuat</dt>
            <dd>Menggunakan HTML5, CSS3, dan JavaScript ES6+ sebagai pilar utama. Dibangun sebagai Single-Page Application (SPA) dengan pola MVP yang modern.</dd>

            <dt>Interaksi Cerdas</dt>
            <dd>
              <ul>
                <li>Fetch API untuk komunikasi dengan Dicoding Story API.</li>
                <li>MediaDevices API (<code>getUserMedia</code>) untuk akses kamera.</li>
                <li>LocalStorage untuk manajemen sesi yang efisien.</li>
              </ul>
            </dd>

            <dt>PWA & Offline-First</dt>
            <dd>
              <ul>
                <li>Service Worker API & Workbox untuk strategi caching.</li>
                <li>IndexedDB API (via <code>idb</code>) untuk penyimpanan data lokal.</li>
                <li>Web App Manifest, Push API, Notifications API untuk pengalaman PWA lengkap.</li>
              </ul>
            </dd>

            <dt>Alat & Perpustakaan</dt>
            <dd>
              <ul>
                <li>LeafletJS & MapTiler API untuk peta dinamis.</li>
                <li>Font Awesome untuk ikonografi yang kaya.</li>
                <li>Webpack & Babel untuk *build* yang modern dan efisien.</li>
                <li>NPM untuk mengelola dependensi proyek.</li>
              </ul>
            </dd>
          </dl>
        </section>

        <section class="developer-section" aria-labelledby="developer-heading">
          <h2 id="developer-heading"><i class="fas fa-code fa-icon" aria-hidden="true"></i> Tentang Pengembang</h2>
          <p class="developer-intro">
            Hai! Saya **yuwwxlvc**, seorang individu yang antusias dengan pengembangan web. Narativa adalah wujud nyata komitmen saya terhadap pembelajaran dan penerapan teknologi terkini, terutama sebagai bagian dari kelas **Belajar Pengembangan Web Intermediate** di Dicoding, yang merupakan bagian dari program **Coding Camp 2025 powered by DBS Foundations**. Saya bersemangat untuk terus berinovasi dan menciptakan solusi digital yang berdampak.
          </p>
          <ul class="social-links">
            <li>
              <a href="https://linkedin.com/in/yuwwxlvc-profile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn yuwwxlvc" title="LinkedIn yuwwxlvc">
                <i class="fab fa-linkedin" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/yuwwxlvc/" target="_blank" rel="noopener noreferrer" aria-label="Instagram yuwwxlvc" title="Instagram yuwwxlvc">
                <i class="fab fa-instagram" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </section>

        <p class="final-note">
          Terima kasih telah mengunjungi Narativa dan mempelajari lebih lanjut tentang perjalanan kami. Kami terus berupaya meningkatkan pengalaman Anda.
          <span class="last-updated">Diperbarui pada ${currentTime} WIB, Yogyakarta.</span>
        </p>
      </section>
    `;
  }

  async afterRender() {
    // Tetap kosong
  }
}

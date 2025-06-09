// CSS imports
import '../styles/styles.css';
import '../styles/responsives.css';
import 'tiny-slider/dist/tiny-slider.css';
import 'leaflet/dist/leaflet.css';

// Components
import App from './pages/app';
import Camera from './utils/camera';
import { registerServiceWorker } from './utils/index';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.getElementById('main-content'),
    drawerButton: document.getElementById('drawer-button'),
    drawerNavigation: document.getElementById('navigation-drawer'),
    skipLinkButton: document.getElementById('skip-link'),
  });
  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    await app.renderPage();
    Camera.stopAllStreams();
  });

  // Daftarkan service worker sekali saja
  await registerServiceWorker();

  // Pastikan tombol subscribe ada sebelum dipasang event listener
  const pushBtn = document.getElementById('subscribe-push');
  if (pushBtn) {
    pushBtn.addEventListener('click', subscribeUser);
  }
});

const publicVapidKey = 'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk';

async function subscribeUser() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    alert('Push notification tidak didukung di browser ini.');
    return;
  }
  if (Notification.permission === 'denied') {
    alert('Notifikasi diblokir di browser Anda.');
    return;
  }
  try {
    if (Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        alert('Izin notifikasi tidak diberikan.');
        return;
      }
    }
    const reg = await navigator.serviceWorker.ready;
    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    // Kirim subscription ke server API Anda
    const response = await fetch('https://story-api.dicoding.dev/v1/notifications/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      alert('Notifikasi diaktifkan!');
    } else {
      alert('Gagal subscribe notifikasi!');
    }
  } catch (err) {
    alert('Gagal subscribe notifikasi: ' + err.message);
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}

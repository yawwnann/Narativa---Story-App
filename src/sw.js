import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

// Precache assets
precacheAndRoute([
  { revision: "92d4eb6f6e1f52bb78bcf790449cee83", url: "sw.js" },
  { revision: "9bde32ec3e86d6285a32ec2ae8219a42", url: "manifest.webmanifest" },
]);

// Push notification handler
self.addEventListener("push", (event) => {
  event.waitUntil(
    (async () => {
      let data = {
        title: "Narativa Notification",
        body: "Ada notifikasi baru!",
      };

      if (event.data) {
        let text = await event.data.text();
        // Coba parse JSON, jika gagal gunakan text sebagai body
        try {
          const jsonData = JSON.parse(text);
          data = {
            ...data,
            ...jsonData,
          };
        } catch (e) {
          data.body = text;
        }
      }

      const options = {
        body: data.body,
        icon: "/images/logo.png",
        badge: "/images/logo.png",
        data: {
          url: data.url || self.location.origin,
        },
        vibrate: [200, 100, 200],
        requireInteraction: true,
      };

      self.registration.showNotification(data.title, options);
    })()
  );
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

// Cache API requests
registerRoute(
  ({ url }) => url.origin === "https://story-api.dicoding.dev/v1",
  new StaleWhileRevalidate({
    cacheName: "api-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 24 * 60 * 60, // 24 jam
      }),
    ],
  })
);

// Cache images
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  })
);

import * as NarativaAPI from "../data/api";

export async function setupNavNotificationButton() {
  const btn = document.getElementById("nav-notification-btn");
  const icon = document.getElementById("nav-notification-btn-icon");
  if (!btn || !icon) return;

  let isSubscribed = await isPushSubscribed();
  updateNotificationBtn(isSubscribed);

  btn.addEventListener("click", async () => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      alert("Push notification tidak didukung di browser ini.");
      return;
    }
    if (Notification.permission === "denied") {
      alert("Notifikasi diblokir di browser Anda.");
      return;
    }
    btn.disabled = true;
    if (!isSubscribed) {
      try {
        if (Notification.permission !== "granted") {
          const permission = await Notification.requestPermission();
          if (permission !== "granted") {
            btn.disabled = false;
            return;
          }
        }
        const reg = await navigator.serviceWorker.ready;
        const applicationServerKey = urlBase64ToUint8Array(
          "BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk"
        );
        const sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey,
        });
        await NarativaAPI.subscribePushNotification({
          endpoint: sub.endpoint,
          keys: sub.toJSON().keys,
        });
        isSubscribed = true;
        updateNotificationBtn(true);
        alert("Notifikasi diaktifkan!");
      } catch (e) {
        alert("Gagal mengaktifkan notifikasi.");
      }
    } else {
      try {
        const reg = await navigator.serviceWorker.ready;
        const sub = await reg.pushManager.getSubscription();
        if (sub) {
          await NarativaAPI.unsubscribePushNotification({
            endpoint: sub.endpoint,
          });
          await sub.unsubscribe();
        }
        isSubscribed = false;
        updateNotificationBtn(false);
        alert("Notifikasi dimatikan.");
      } catch (e) {
        alert("Gagal mematikan notifikasi.");
      }
    }
    btn.disabled = false;
  });

  function updateNotificationBtn(isSubscribed) {
    if (isSubscribed) {
      icon.innerHTML = '<i class="fas fa-bell"></i>';
      btn.title = "Matikan Notifikasi";
    } else {
      icon.innerHTML = '<i class="far fa-bell"></i>';
      btn.title = "Aktifkan Notifikasi";
    }
  }
}

async function isPushSubscribed() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window))
    return false;
  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.getSubscription();
  return !!sub;
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

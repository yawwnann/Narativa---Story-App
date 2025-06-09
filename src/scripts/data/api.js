import { getAccessToken } from '../utils/auth';
import { CONFIG } from '../config';

const ENDPOINTS = {
  REGISTER: `${CONFIG}/register`,
  LOGIN: `${CONFIG}/login`,
  GET_ALL_STORY: `${CONFIG}/stories`,
  STORY_DETAIL: (id) => `${CONFIG}/stories/${id}`,
  STORE_NEW_STORY: `${CONFIG}/stories`,
  SUBSCRIBE: `${CONFIG}/notifications/subscribe`,
  UNSUBSCRIBE: `${CONFIG}/notifications/subscribe`,
};

export async function getRegistered({ name, email, password }) {
  const response = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const json = await response.json();
  return { ...json, ok: response.ok };
}

export async function getLogin({ email, password }) {
  const response = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();
  return { ...json, ok: response.ok };
}

export async function getAllStory() {
  const token = getAccessToken();

  const response = await fetch(ENDPOINTS.GET_ALL_STORY, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const json = await response.json();
  return { ...json, ok: response.ok };
}

export async function getStoryById(id) {
  const token = getAccessToken();

  const response = await fetch(ENDPOINTS.STORY_DETAIL(id), {
    headers: { Authorization: `Bearer ${token}` },
  });

  const json = await response.json();
  return {
      ...json,
      ok: response.ok,
      data: json.story,
    };
  }

export async function storeNewStory({ description, photo, lat, lon }) {
  const token = getAccessToken();

  const formData = new FormData();

  formData.set('description', description);

  if (!photo || !(photo instanceof Blob)) {
    throw new Error('Photo is required and must be readable');
  }

  formData.set('photo', photo); // ✅ harus bernama photo

  if (lat) formData.set('lat', lat);
  if (lon) formData.set('lon', lon);

  const fetchResponse = await fetch(`${CONFIG}/stories`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}


export async function subscribePushNotification({ endpoint, keys }) {
  const token = getAccessToken();
  const response = await fetch(ENDPOINTS.SUBSCRIBE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ endpoint, keys }),
  });
  const json = await response.json();
  return { ...json, ok: response.ok };
}

export async function unsubscribePushNotification({ endpoint }) {
  const token = getAccessToken();
  const response = await fetch(ENDPOINTS.UNSUBSCRIBE, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ endpoint }),
  });
  const json = await response.json();
  return { ...json, ok: response.ok };
}

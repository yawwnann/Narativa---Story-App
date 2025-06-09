import Map from '../utils/map';

export async function storyMapper(story) {
  const hasLocation = story.lat !== undefined && story.lon !== undefined;

  const location = hasLocation
    ? {
        latitude: story.lat,
        longitude: story.lon,
        placeName: await Map.getPlaceNameByCoordinate(story.lat, story.lon).catch(() => 'Lokasi tidak diketahui'),
      }
    : null;

  return {
    ...story,
    location,
  };
}


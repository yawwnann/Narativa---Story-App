import {
  generateStoryItemTemplate,
  generateStoriesListEmptyTemplate,
} from '../templates';
import { getAllStories, deleteStory } from '../utils/db.js';

export default class BookmarkPage {
  async render() {
    return `
      <section class="container">
        <h1 class="section-title">Bookmark Cerita</h1>
        <div class="stories-list__container">
          <div id="bookmark-list"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const stories = await getAllStories();
    const list = document.getElementById('bookmark-list');

    if (!stories.length) {
      list.innerHTML = generateStoriesListEmptyTemplate();
      return;
    }

    const html = stories.map(story =>
      `<div class="story-item-wrapper">
        ${generateStoryItemTemplate({
          ...story,
          reporterName: story.name,
        })}
        <button 
          class="btn btn-outline delete-bookmark" 
          data-id="${story.id}" 
          style="margin: 10px 0 0 0; width: 100%;">
          Hapus dari Bookmark
        </button>
      </div>`
    ).join('');

    list.innerHTML = `<div class="stories-list">${html}</div>`;

    list.querySelectorAll('.delete-bookmark').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        await deleteStory(btn.dataset.id);
        this.afterRender();
      });
    });
  }
}
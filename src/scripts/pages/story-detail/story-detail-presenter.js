import { storyMapper } from "../../data/api-mapper";
import { getAllStories } from "../../utils/db.js";

export default class StoryDetailPresenter {
  #storyId;
  #view;
  #apiModel;
  _currentStory;

  constructor(storyId, { view, apiModel }) {
    this.#storyId = storyId;
    this.#view = view;
    this.#apiModel = apiModel;
  }

  async showStoryDetailMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error("showStoryDetailMap: error:", error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async showStoryDetail() {
    this.#view.showStoryDetailLoading();
    try {
      const response = await this.#apiModel.getStoryById(this.#storyId);

      if (!response.ok) {
        console.error("showStoryDetailAndMap: response:", response);
        this.#view.populateStoryDetailError(response.message);
        return;
      }

      const story = await storyMapper(response.story);
      console.log(story);
      this.#view.populateStoryDetailAndInitialMap(response.message, story);
      this._currentStory = story; // simpan story yang sedang ditampilkan
    } catch (error) {
      console.error("showStoryDetailAndMap: error:", error);
      this.#view.populateStoryDetailError(error.message);
    } finally {
      this.#view.hideStoryDetailLoading();
    }
  }

  getCurrentStory() {
    return this._currentStory;
  }

  async showSaveButton() {
    const savedStories = await getAllStories();
    const isSaved = savedStories.some((story) => story.id === this.#storyId);
    if (isSaved) {
      this.#view.renderRemoveButton();
      return;
    }
    this.#view.renderSaveButton();
  }
}

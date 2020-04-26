import {createElement} from "../utils";

const createRollupBtnMarkup = () => {
  return (
    `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
     </button>`
  );
};

export default class RollupBtn {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createRollupBtnMarkup();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

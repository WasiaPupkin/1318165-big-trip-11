import {createElement} from "../utils";

const createPathPointContainerTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class PathPointContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createPathPointContainerTemplate();
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



import {createElement} from "../utils";

const createHiddenTipsTemplate = (text) => {
  return (
    `<h2 class="visually-hidden">${text}</h2>`
  );
};

export default class HiddenTips {
  constructor(text) {
    this._element = null;
    this._text = text;
  }

  getTemplate() {
    return createHiddenTipsTemplate(this._text);
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

import {createElement, isoDateFormat} from "../utils";

const craetePathPointContainerElement = (pathPoint, dayCounter) => {
  const {pathPointStartDateTime} = pathPoint;
  return (
    `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${dayCounter}</span>
                <time class="day__date" datetime=${isoDateFormat(pathPointStartDateTime)}>${pathPointStartDateTime.toLocaleString(`en-US`, {month: `short`})} ${pathPointStartDateTime.getDate()}</time>
              </div>

              <ul class="trip-events__list">
              </ul>
            </li>`
  );
};

export default class PathPointElement {
  constructor(pathPoint, dayCounter) {
    this._element = null;
    this._pathPoint = pathPoint;
    this._dayCounter = dayCounter;
  }

  getTemplate() {
    return craetePathPointContainerElement(this._pathPoint, this._dayCounter);
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

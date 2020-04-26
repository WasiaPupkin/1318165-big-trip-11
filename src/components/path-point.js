import {formatTime, getRandomIntegerNumber} from '../utils.js';
import {PathPointTypes} from '../const';
import RollupBtnComponent from './rollupBtn';
import {createElement} from "../utils";

const createOffersMarkup = (offer) => {
  const {optionName, optionPrice} = offer;

  return (
    `<li class="event__offer">
              <span class="event__offer-title">${optionName}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${optionPrice}</span>
             </li>`
  );
};

const createPathPointTemplate = (pathPoint) => {
  const {pathPointType, destinationCity, offers, pathPointStartDateTime, pathPointEndDateTime, pathPointDuration, price} = pathPoint;

  const preposition = PathPointTypes.IN_WAY.find((el) => {
    return el === pathPointType;
  }) !== undefined ? `to` : `in`;
  const offersMarkup = offers.slice(0, getRandomIntegerNumber(1, 4)).map((it) => createOffersMarkup(it)).join(`\n`);

  return (
    `<li class="trip-events__item">
                  <div class="event">
                    <div class="event__type">
                      <img class="event__type-icon" width="42" height="42" src="img/icons/${pathPointType.toLowerCase()}.png" alt="Event type icon">
                    </div>
                    <h3 class="event__title">${pathPointType} ${preposition} ${destinationCity}</h3>

                    <div class="event__schedule">
                      <p class="event__time">
                        <time class="event__start-time" datetime=${pathPointStartDateTime}>${formatTime(pathPointStartDateTime)}</time>
                        &mdash;
                        <time class="event__end-time" datetime=${pathPointEndDateTime}>${formatTime(pathPointEndDateTime)}</time>
                      </p>
                      <p class="event__duration">${pathPointDuration}</p>
                    </div>

                    <p class="event__price">
                      &euro;&nbsp;<span class="event__price-value">${price}</span>
                    </p>

                    <h4 class="visually-hidden">Offers:</h4>
                    <ul class="event__selected-offers">
                       ${offersMarkup}
                    </ul>
                    ${new RollupBtnComponent().getTemplate()}
                  </div>
                </li>`
  );
};

export default class PathPoint {
  constructor(pathPoint) {
    this._element = null;
    this._pathPoint = pathPoint;
  }

  getTemplate() {
    return createPathPointTemplate(this._pathPoint);
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

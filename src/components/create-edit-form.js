import {editFormFormatTime} from '../utils';
import {AVAILABLE_OFFERS, CITIES, PathPointTypes} from '../const';
import {createRollupBtnMarkup} from './rollupBtn';


const createTypeItemMarkup = (typesArr, index) => {
  const isChecked = Math.random() > 0.5;
  return typesArr.map((type) =>{
    return (`
         <div class="event__type-item">
          <input id="event-type-taxi-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}" ${isChecked ? `checked` : ``}>
          <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-taxi-${index}">${type}</label>
        </div>
    `);
  }).join(`\n`);
};

const createPhotosMarkup = (description) => {
  if (description === null || description === undefined) {
    return ``;
  }

  const {photos} = description;
  return photos.map((photo) => {
    return (
      `<img class="event__photo" src=${photo} alt="Event photo">`
    );
  })
    .join(`\n`);
};

const createOffersMarkup = (offers) => {
  const isNewItemForm = offers === null || offers === undefined;
  return AVAILABLE_OFFERS.map((availOffer, index) => {
    const isChecked = offers ? offers.find((offer)=> {
      return availOffer.optionType === offer.optionType;
    }) !== undefined : false;

    return (
      `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${availOffer.optionType}-${index}" type="checkbox" name="event-offer-${availOffer.optionType}" ${isChecked ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${availOffer.optionType}-${isNewItemForm ? 0 : index}">
            <span class="event__offer-title">${availOffer.optionName}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${availOffer.optionPrice}</span>
          </label>
        </div>`
    );
  })
  .join(`\n`);
};

const createCitiesDataListMarkup = (index)=>{
  const dataList = document.createElement(`datalist`);
  dataList.setAttribute(`id`, `destination-list-${index}`);

  dataList.innerHTML = CITIES
    .map((city) => {
      return (
        `<option value=${city}></option>`
      );
    })
    .join(`\n`);

  return dataList.outerHTML;

};

const createFavoriteMarkup = (index, isFavorite) => {
  return (
    `<input id="event-favorite-${index}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
    <label class="event__favorite-btn" for="event-favorite-${index}">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
    </label>`
  );

};

export const createFormCreateEditTemplate = (pathPoint, formIndex) => {
  const {
    pathPointType,
    destinationCity,
    offers,
    pathPointStartDateTime,
    pathPointEndDateTime,
    price,
    destinationDescription,
    isFavorite} = pathPoint ? pathPoint : ``;

  const typeItemMarkupInWay = createTypeItemMarkup(PathPointTypes.IN_WAY, formIndex);
  const typeItemMarkupOnWay = createTypeItemMarkup(PathPointTypes.ON_WAY, formIndex);
  const availableOffersMarkup = createOffersMarkup(offers);
  const citiesDataListMarkup = createCitiesDataListMarkup(formIndex);
  const favoriteMarkup = createFavoriteMarkup(formIndex, isFavorite);
  const rollUpBtnMarkup = createRollupBtnMarkup();

  const preposition = PathPointTypes.ON_WAY.find((el) => {
    return el === pathPointType;
  }) !== undefined ? `to` : `in`;

  const isNewItemForm = !pathPoint;
  const isNewItemFormClass = pathPoint ? `` : `trip-events__item`;

  return (
    `<form class="${isNewItemFormClass}  event  event--edit" action="#" method="post">
           <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-${formIndex}">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${isNewItemForm ? `flight` : pathPointType.toLowerCase()}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${formIndex}" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Transfer</legend>
                    ${typeItemMarkupOnWay}

                  </fieldset>

                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>
                    ${typeItemMarkupInWay}

                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-${formIndex}">
                  ${isNewItemForm ? `Plane to` : pathPointType + ` ` + preposition}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-${formIndex}" type="text" name="event-destination" value="${isNewItemForm ? CITIES[0] : destinationCity}" list="destination-list-${formIndex}">
                 ${citiesDataListMarkup}
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-${formIndex}">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-${formIndex}" type="text" name="event-start-time" value="${editFormFormatTime(pathPointStartDateTime)}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-${formIndex}">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-${formIndex}" type="text" name="event-end-time" value="${editFormFormatTime(pathPointEndDateTime)}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-${formIndex}">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-${formIndex}" type="text" name="event-price" value="${isNewItemForm ? 0 : price}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">${isNewItemForm ? `Cancel` : `Delete`}</button>
              ${!isNewItemForm ? `${favoriteMarkup}${rollUpBtnMarkup}` : ``}
            </header>
            <section class="event__details">
              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers">
                    ${availableOffersMarkup}
                </div>
              </section>

              <section class="event__section  event__section--destination ${isNewItemForm ? `visually-hidden` : ``}">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${!isNewItemForm ? destinationDescription.desc : ``}</p>

                <div class="event__photos-container">
                  <div class="event__photos-tape">
                       ${createPhotosMarkup(destinationDescription)}
                  </div>
                </div>
              </section>
            </section>
          </form>`
  );
};

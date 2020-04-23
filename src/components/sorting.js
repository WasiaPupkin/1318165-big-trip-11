import {SORTING_VALUES} from '../const';


const createSortingElementMarkup = () => {
  return SORTING_VALUES.map((value) => {
    switch (value) {
      case `Day`:
      case `Offers`: return (`<span class="trip-sort__item  trip-sort__item--${value.toLowerCase()}">${value}</span>`);
      case `Event`:
      case `Price`:
      case `Time`: return (
        `
        <div class="trip-sort__item  trip-sort__item--${value.toLowerCase()}">
          <input id="sort-${value.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${value.toLowerCase()}" ${value === SORTING_VALUES[1] ? `checked` : ``}>
          <label class="trip-sort__btn" for="sort-${value.toLowerCase()}">${value}</label>
        </div>
      `
      );
    }
    return null;
  }).join(`\n`);
};

export const createSortingTemplate = () => {
  return (
    `          <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
               ${createSortingElementMarkup()}
          </form>`
  );
};

import {FILTER_VALUES} from '../const';

const createFilterMarkup = () => {
  return FILTER_VALUES.map((val)=>{
    return (
      `<div class="trip-filters__filter">
      <input id="filter-${val.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${val.toLowerCase()}" ${val === FILTER_VALUES[0] ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${val.toLowerCase()}">${val}</label>
    </div>`
    );
  }).join(`\n`);
};


export const createFiltersTemplate = () => {
  return (
    `<form class="trip-filters" action="#" method="get">
        ${createFilterMarkup()}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

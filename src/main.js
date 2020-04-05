import {createTripInfoTemplate} from "./components/trip-info.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFiltersTemplate} from "./components/filters.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createFormCreateEditTemplate} from "./components/create-edit-form.js";
import {createPathPointContainerTemplate} from "./components/path-point-container.js";
import {createPathPointTemplate} from "./components/path-point.js";

const PATH_POINTS_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const pageHeader = document.querySelector(`.page-header`);
const tripInfoContainer = pageHeader.querySelector(`.trip-main`);

render(tripInfoContainer, createTripInfoTemplate(), `afterBegin`);

const tripControlsContainer = tripInfoContainer.querySelector(`.trip-controls`);
const menuContainerAfter = tripControlsContainer.querySelector(`h2`);

render(menuContainerAfter, createMenuTemplate(), `afterEnd`);
render(tripControlsContainer, createFiltersTemplate(), `beforeEnd`);

const bodyMainContainer = document.querySelector(`.page-main`);
const tripEventsContainer = bodyMainContainer.querySelector(`.trip-events`);
const eventSortingContainerAfter = tripEventsContainer.querySelector(`h2`);

render(eventSortingContainerAfter, createSortingTemplate(), `afterEnd`);

render(tripEventsContainer, createFormCreateEditTemplate(), `beforeEnd`);

render(tripEventsContainer, createPathPointContainerTemplate(), `beforeEnd`);

const pathPoinsContainer = tripEventsContainer.querySelector(`.trip-events__list`);

for (let i = 0; i < PATH_POINTS_COUNT; i++) {
  render(pathPoinsContainer, createPathPointTemplate(), `beforeend`);
}


import {createTripInfoTemplate} from "./components/trip-info.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFiltersTemplate} from "./components/filters.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createFormCreateEditTemplate} from "./components/create-edit-form.js";
import {craetePathPointContainerElement, createPathPointContainerTemplate} from "./components/path-point-container.js";
import {createPathPointTemplate} from "./components/path-point.js";
import {generatePathPoints} from "./mock/path-point.js";

const PATH_POINTS_COUNT = 20;
let formIndex = 0;
let currentDate;
let dayCounter = 0;
let pathPoinsContainer;
let oneTimeEditFormCreation = true;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const pageHeader = document.querySelector(`.page-header`);
const tripInfoContainer = pageHeader.querySelector(`.trip-main`);

const pathPoints = generatePathPoints(PATH_POINTS_COUNT);

render(tripInfoContainer, createTripInfoTemplate(pathPoints), `afterbegin`);

const tripControlsContainer = tripInfoContainer.querySelector(`.trip-controls`);
const menuContainerAfter = tripControlsContainer.querySelector(`h2`);

render(menuContainerAfter, createMenuTemplate(), `afterend`);
render(tripControlsContainer, createFiltersTemplate());

const bodyMainContainer = document.querySelector(`.page-main`);
const tripEventsContainer = bodyMainContainer.querySelector(`.trip-events`);
const eventSortingContainerAfter = tripEventsContainer.querySelector(`h2`);

render(eventSortingContainerAfter, createSortingTemplate(), `afterend`);
render(tripEventsContainer, createFormCreateEditTemplate(null, formIndex));

pathPoints.forEach((pathPoint) => {

  const pathPointstartDate = new Date(pathPoint.pathPointStartDateTime.getFullYear(), pathPoint.pathPointStartDateTime.getMonth(), pathPoint.pathPointStartDateTime.getDate());

  if (!currentDate || (currentDate && currentDate.getTime() !== pathPointstartDate.getTime())) {
    currentDate = pathPointstartDate;
    const currentPathPointContainerTemplate = createPathPointContainerTemplate();
    render(tripEventsContainer, currentPathPointContainerTemplate);
    let tripDaysContainers = tripEventsContainer.querySelectorAll(`.trip-days`);
    let tripDaysContainer = tripDaysContainers[tripDaysContainers.length - 1];
    render(tripDaysContainer, craetePathPointContainerElement(pathPoint, ++dayCounter));
    pathPoinsContainer = tripDaysContainer.querySelector(`.trip-events__list`);
    if (oneTimeEditFormCreation) {
      render(pathPoinsContainer, createFormCreateEditTemplate(pathPoint, ++formIndex));
      oneTimeEditFormCreation = false;
    } else {
      render(pathPoinsContainer, createPathPointTemplate(pathPoint));
    }

  } else if (pathPoinsContainer) {
    render(pathPoinsContainer, createPathPointTemplate(pathPoint));
  }
});


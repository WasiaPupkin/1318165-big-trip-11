import TripInfoComponent from './components/trip-info';
import MenuComponent from './components/menu';
import FiltersComponent from './components/filters';
import SortComponent from './components/sort';
import EditFormComponent from './components/create-edit-form';
import PathPointContainerComponent from './components/path-point-container';
import PathPointElementComponent from './components/path-point-element';
import PathPointComponent from './components/path-point';
import HiddenTipsComponent from './components/hidden-tips';
import {generatePathPoints} from './mock/path-point';
import {render, RenderPosition} from './utils';

const PATH_POINTS_COUNT = 20;
let formIndex = 0;
let currentDate;
let dayCounter = 0;
let pathPoinsContainer;

const pageHeader = document.querySelector(`.page-header`);
const tripInfoContainer = pageHeader.querySelector(`.trip-main`);

const pathPoints = generatePathPoints(PATH_POINTS_COUNT);

render(tripInfoContainer, new TripInfoComponent(pathPoints).getElement(), RenderPosition.AFTERBEGIN);

const tripControlsContainer = tripInfoContainer.querySelector(`.trip-controls`);

render(tripControlsContainer, new HiddenTipsComponent(`Switch trip view`).getElement());
render(tripControlsContainer, new MenuComponent().getElement());
render(tripControlsContainer, new HiddenTipsComponent(`Filter events`).getElement());
render(tripControlsContainer, new FiltersComponent().getElement());

const bodyMainContainer = document.querySelector(`.page-main`);
const tripEventsContainer = bodyMainContainer.querySelector(`.trip-events`);

render(tripEventsContainer, new HiddenTipsComponent(`Trip events`).getElement());
render(tripEventsContainer, new SortComponent().getElement());

const renderPathPoint = (pathPointsContainer, pathPoint) => {
  const replacePathPointToEdit = () => {
    pathPointsContainer.replaceChild(editFormComponent.getElement(), pathPointComponent.getElement());
  };

  const replaceEditToPathPoint = () => {
    pathPointsContainer.replaceChild(pathPointComponent.getElement(), editFormComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToPathPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const pathPointComponent = new PathPointComponent(pathPoint);
  const editButton = pathPointComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    replacePathPointToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const editFormComponent = new EditFormComponent(pathPoint, ++formIndex);
  const editForm = editFormComponent.getElement();
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToPathPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(pathPointsContainer, pathPointComponent.getElement());
};

pathPoints.forEach((pathPoint) => {

  const pathPointstartDate = new Date(pathPoint.pathPointStartDateTime.getFullYear(), pathPoint.pathPointStartDateTime.getMonth(), pathPoint.pathPointStartDateTime.getDate());

  if (!currentDate || (currentDate && currentDate.getTime() !== pathPointstartDate.getTime())) {
    currentDate = pathPointstartDate;
    render(tripEventsContainer, new PathPointContainerComponent().getElement());
    let tripDaysContainers = tripEventsContainer.querySelectorAll(`.trip-days`);
    let tripDaysContainer = tripDaysContainers[tripDaysContainers.length - 1];
    render(tripDaysContainer, new PathPointElementComponent(pathPoint, ++dayCounter).getElement());
    pathPoinsContainer = tripDaysContainer.querySelector(`.trip-events__list`);
    renderPathPoint(pathPoinsContainer, pathPoint);
  } else if (pathPoinsContainer) {
    renderPathPoint(pathPoinsContainer, pathPoint);
  }
});


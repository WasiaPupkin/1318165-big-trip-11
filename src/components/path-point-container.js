import {isoDateFormat} from '../utils';

const craetePathPointContainerElement = (pathPoint, dayCounter) => {
  const {pathPointStartDateTime} = pathPoint;
  return (`
              <li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${dayCounter}</span>
                <time class="day__date" datetime=${isoDateFormat(pathPointStartDateTime)}>${pathPointStartDateTime.toLocaleString(`default`, {month: `short`})} ${pathPointStartDateTime.getDate()}</time>
              </div>

              <ul class="trip-events__list">
              </ul>
            </li>
  `);
};

const createPathPointContainerTemplate = () => {

  return (
    `<ul class="trip-days">

     </ul>`
  );
};

export {createPathPointContainerTemplate, craetePathPointContainerElement};

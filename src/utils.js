
const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

// день/месяц/год часы:минуты
const editFormFormatTime = (date) => {
  if (!date) {
    return ``;
  }
  const hours = date.getHours();
  const minutes = castTimeFormat(date.getMinutes());
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const isoDateFormat = (date) => {
  if (!date) {
    return ``;
  }
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${year}-${day}-${month}`;
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export {formatTime, getRandomIntegerNumber, editFormFormatTime, isoDateFormat, createElement, render, RenderPosition};

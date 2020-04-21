
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

export {formatTime, getRandomIntegerNumber, editFormFormatTime, isoDateFormat};

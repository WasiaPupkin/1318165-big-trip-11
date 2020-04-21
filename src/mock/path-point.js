import {getRandomIntegerNumber} from '../utils';
import {AdditionalOptions, CITIES, DateMs, DESCRIPTION_ARR, PathPointTypes} from '../const';

let dates = [];

const getRandomDescription = () =>{
  return new Array(getRandomIntegerNumber(1, 5))
    .fill(``)
    .map(()=> {
      return getRandomArrayItem(DESCRIPTION_ARR);
    });
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(1, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);
  targetDate.setHours(targetDate.getHours() + getRandomIntegerNumber(1, 10));
  targetDate.setMinutes(targetDate.getMinutes() + getRandomIntegerNumber(1, 30));

  return targetDate;
};

const generateDates = (count) => {
  let nums = count * 2;
  let doJob = true;

  while (doJob) {
    let tmpDate = getRandomDate();
    let date = new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate(), tmpDate.getHours(), tmpDate.getMinutes());

    if (dates.find((it)=> {
      return it.getTime() === date.getTime();
    }) === undefined) {
      dates.push(date);
    }

    if (dates.length === nums) {
      doJob = false;
    }
  }

  return dates.sort((a, b) => b - a);
};

const generateDescription = () => {
  return {
    desc: getRandomDescription(),
    photos: [`http://picsum.photos/248/152?r=${Math.random()}`]
  };
};

const additionalOption = () => {
  return {
    optionType: getRandomArrayItem(AdditionalOptions.TYPES),
    optionName: getRandomArrayItem(AdditionalOptions.NAMES),
    optionPrice: getRandomArrayItem(AdditionalOptions.PRICES)
  };
};

const generateAdditionalOptions = (count) => {
  return new Array(count)
    .fill(``)
    .map(additionalOption);
};

const generateDurationString = (pathPointStartDateTime, pathPointEndDateTime) =>{
  let days;
  let hours;
  let minutes;
  let durationStr = ``;

  if (pathPointEndDateTime.getDate() - pathPointStartDateTime.getDate() > 0) {
    days = pathPointEndDateTime.getDate() - pathPointStartDateTime.getDate();
  }

  let diff = pathPointEndDateTime - pathPointStartDateTime;

  if (diff / DateMs.DAYS_MILLISEC > 1) {
    days = Math.floor(diff / DateMs.DAYS_MILLISEC);

    hours = Math.floor((diff % DateMs.DAYS_MILLISEC / DateMs.HOURS_MILLISEC));
    if ((diff % DateMs.DAYS_MILLISEC / DateMs.HOURS_MILLISEC) > 1) {
      minutes = Math.floor((diff % DateMs.HOURS_MILLISEC / DateMs.MINUTES_MILLISEC));
    }

  } else if ((diff % DateMs.DAYS_MILLISEC / DateMs.HOURS_MILLISEC) > 1) {
    hours = Math.floor((diff % DateMs.DAYS_MILLISEC / DateMs.HOURS_MILLISEC));
    minutes = Math.floor((diff % DateMs.HOURS_MILLISEC / DateMs.MINUTES_MILLISEC));
  } else {
    minutes = Math.floor((diff % DateMs.DAYS_MILLISEC / DateMs.MINUTES_MILLISEC));
  }

  if (days) {
    durationStr += `${days}D `;
  }

  if (hours) {
    durationStr += `${hours}H `;
  }

  if (minutes) {
    durationStr += `${minutes}M`;
  }

  return durationStr;
};

const generatePathPoint = () => {
  let pathPointStartDateTime = dates.pop();
  let pathPointEndDateTime = dates.pop();

  if (pathPointStartDateTime.getTime() > pathPointEndDateTime.getTime()) {
    let tmpTime = pathPointEndDateTime;
    pathPointEndDateTime = pathPointStartDateTime;
    pathPointStartDateTime = tmpTime;
  } else if (pathPointStartDateTime.getMinutes() === pathPointEndDateTime.getMinutes()) {
    pathPointEndDateTime.setHours(pathPointEndDateTime.getHours() + 1);
  }

  return {
    pathPointType: getRandomArrayItem([...PathPointTypes.ON_WAY, ...PathPointTypes.IN_WAY]),
    destinationCity: getRandomArrayItem(CITIES),
    offers: generateAdditionalOptions(getRandomIntegerNumber(0, 5)),
    pathPointStartDateTime,
    pathPointEndDateTime,
    pathPointDuration: generateDurationString(pathPointStartDateTime, pathPointEndDateTime),
    price: getRandomIntegerNumber(150, 800),
    destinationDescription: generateDescription(),
    isFavorite: Math.random() > 0.5
  };
};

const generatePathPoints = (count) => {
  dates = generateDates(count);
  return new Array(count)
    .fill(``)
    .map(generatePathPoint);
};

export {generatePathPoint, generatePathPoints};

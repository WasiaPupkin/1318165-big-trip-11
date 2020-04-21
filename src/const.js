const SORTING_VALUES = [`Day`, `Event`, `Time`, `Price`, `Offers`];
const FILTER_VALUES = [`Everything`, `Future`, `Past`];
const PathPointTypes = {
  ON_WAY: [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`],
  IN_WAY: [`Check-in`, `Sightseeing`, `Restaurant`]
};

const AVAILABLE_OFFERS = [
  {
    optionType: `luggage`,
    optionName: `Add luggage`,
    optionPrice: 30
  },
  {
    optionType: `comfort`,
    optionName: `Switch to comfort class`,
    optionPrice: 100
  },
  {
    optionType: `meal`,
    optionName: `Add meal`,
    optionPrice: 15
  },
  {
    optionType: `seats`,
    optionName: `Choose seats`,
    optionPrice: 5
  },
  {
    optionType: `train`,
    optionName: `Travel by train`,
    optionPrice: 40
  }
];

const CITIES = [`Moscow`, `Washington`, `Volgograd`];

const AdditionalOptions = {
  TYPES: [`luggage`, `comfort`, `meal`, `seats`, `train`],
  NAMES: [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`, `Travel by train`],
  PRICES: [5, 15, 30, 40, 100]
};

const DESCRIPTION_ARR = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`. `);

const DateMs = {
  DAYS_MILLISEC: 1000 * 60 * 60 * 24,
  HOURS_MILLISEC: 1000 * 60 * 60,
  MINUTES_MILLISEC: 1000 * 60
};

export {PathPointTypes, AVAILABLE_OFFERS, AdditionalOptions, CITIES, DESCRIPTION_ARR, DateMs, FILTER_VALUES, SORTING_VALUES};

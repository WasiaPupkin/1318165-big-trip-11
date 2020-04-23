export const createTripInfoTemplate = (pathPoints) =>{
  const tripPathArr = [];
  const tripPrice = pathPoints.reduce((accumulator, currentValue) => {
    tripPathArr.push(currentValue.destinationCity);
    return accumulator + currentValue.price;
  }, 0);

  const tripStartDate = pathPoints[0].pathPointStartDateTime.toLocaleString(`en-US`, {month: `short`}) + ` ` + pathPoints[0].pathPointStartDateTime.getDate();
  const tripEndDate = pathPoints[pathPoints.length - 1].pathPointStartDateTime.getDate();

  return (
    `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${tripPathArr.length <= 3 ? tripPathArr.join(` &mdash; `) : (tripPathArr[0] + ` &mdash; ... &mdash; ` + tripPathArr[tripPathArr.length - 1])}</h1>
              <p class="trip-info__dates">${tripStartDate} &nbsp;&mdash;&nbsp; ${tripEndDate}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripPrice}</span>
            </p>
      </section>
`
  );
};

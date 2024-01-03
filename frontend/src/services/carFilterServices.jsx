const filterCars = (cars, motorisation, price, kilometer) => {
  const filteredCars = cars.filter((car) => {
    const motorisationFilter =
      (motorisation === "Diesel" && car.motorisation === "Diesel") ||
      (motorisation === "Petrol" && car.motorisation === "Petrol") ||
      motorisation === "";

    const priceFilter =
      (price === "9999" && car.price <= 10000) ||
      (price === "19999" && car.price > 10000 && car.price <= 20000) ||
      (price === "29999" && car.price > 20000 && car.price <= 30000) ||
      (price === "30000" && car.price > 30000) ||
      price === "";

    const kilometerFilter =
      (kilometer === "9999" &&
        car.kilometer >= 1000 &&
        car.kilometer <= 10000) ||
      (kilometer === "19999" &&
        car.kilometer > 10000 &&
        car.kilometer <= 20000) ||
      (kilometer === "29999" &&
        car.kilometer > 20000 &&
        car.kilometer <= 30000) ||
      (kilometer === "39999" &&
        car.kilometer > 30000 &&
        car.kilometer <= 40000) ||
      (kilometer === "49999" &&
        car.kilometer >= 40000 &&
        car.kilometer < 50000) ||
      (kilometer === "59999" &&
        car.kilometer >= 49999 &&
        car.kilometer <= 59999) ||
      (kilometer === "69999" && car.kilometer > 60000) ||
      kilometer === "";

    return motorisationFilter && priceFilter && kilometerFilter;
  });

  return filteredCars;
};

export default filterCars;

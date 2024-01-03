const AbstractManager = require("./AbstractManager");

class CarbrandManager extends AbstractManager {
  constructor() {
    super({ table: "car_brand" });
  }

  findModelsFromBrand() {
    return this.database.query(
      `SELECT car_brand.car_brand_name, car_model.car_model_name
      FROM car_brand
      JOIN car_model ON car_brand.car_brand_id = car_model.car_brand_id;
      `
    );
  }
  // // search Announce page

  // selectByBrand(brand) {
  //   return this.database.query(
  //     `SELECT car_brand.car_brand_name
  //     FROM car_brand;
  //     `,
  //     [brand]
  //   );
  // }
}

module.exports = CarbrandManager;

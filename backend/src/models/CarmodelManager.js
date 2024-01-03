const AbstractManager = require("./AbstractManager");

class CarmodelManager extends AbstractManager {
  constructor() {
    super({ table: "car_model" });
  }

  // // search Announce page
  findModelsFromBrand(id) {
    return this.database.query(
      `SELECT m.car_model_name, b.car_brand_id, m.car_model_id
      FROM car_model as m
      JOIN car_brand as b ON m.car_brand_id = b.car_brand_id
      WHERE b.car_brand_id = ?;
    `,
      [id]
    );
  }
}

module.exports = CarmodelManager;

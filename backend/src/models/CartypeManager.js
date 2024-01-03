const AbstractManager = require("./AbstractManager");

class CartypeManager extends AbstractManager {
  constructor() {
    super({ table: "car_type" });
  }

  // search Announce page
  findTypes(type) {
    return this.database.query(
      `SELECT car_type_id, car_type_name FROM car_type;`,
      [type]
    );
  }
  // const browse = (req, res) => {
  //   models.cartype
  //     .findAll()
  //     .then(([rows]) => {
  //       res.send(rows);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.sendStatus(500);
  //     });
  // };
}

module.exports = CartypeManager;

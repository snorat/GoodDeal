const models = require("../models");

const browse = (req, res) => {
  models.carbrand
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const modelsFromBrand = (req, res) => {
  models.carbrand
    .findModelsFromBrand()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// ANNOUNCE PAGE
const searchByBrandAnnounce = (req, res) => {
  const { brand } = req.params;
  models.car_brand.selectByBrand(brand).then(([rows]) => {
    if (rows[0] == null) {
      res.sendStatus(404);
    } else {
      res.send(rows);
    }
  });
};

module.exports = {
  browse,
  modelsFromBrand,
  searchByBrandAnnounce,
};

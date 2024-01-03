const models = require("../models");

const browse = (req, res) => {
  models.carmodel
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// ANNOUNCE PAGE
const searchBymodelAnnounce = (req, res) => {
  const { model } = req.params;
  models.car_model.selectByModel(model).then(([rows]) => {
    if (rows[0] == null) {
      res.sendStatus(404);
    } else {
      res.send(rows);
    }
  });
};

const listModelByBrand = (req, res) => {
  const { id } = req.params;
  models.carmodel.findModelsFromBrand(id).then(([rows]) => {
    if (rows[0] == null) {
      res.sendStatus(404);
    } else {
      res.send(rows);
    }
  });
};

module.exports = {
  browse,
  searchBymodelAnnounce,
  listModelByBrand,
};

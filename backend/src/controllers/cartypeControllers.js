const models = require("../models");

const browse = (req, res) => {
  models.cartype
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
const types = (req, res) => {
  models.cartype
    .findTypes()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  types,
};

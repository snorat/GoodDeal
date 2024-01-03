const models = require("../models");

const add = (req, res) => {
  const newsletter = req.body;

  models.newsletter
    .insert(newsletter)
    .then(() => {
      res
        .status(200)
        .json({ message: "Merci de vous être inscrit à notre Newsletter" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err.errno,
      });
    });
};

const read = (req, res) => {
  models.newsletter
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  read,
  add,
};

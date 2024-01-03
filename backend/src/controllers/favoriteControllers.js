const models = require("../models");

const browse = (req, res) => {
  models.favorite
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const favorite = req.body;
  models.favorite
    .insert(favorite)
    .then(() => {
      res.status(200).json({ message: "Annonce ajouté aux favoris" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err.errno,
      });
    });
};

const readFavorite = (req, res) => {
  models.favorite
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

const readFavoritebyUser = (req, res) => {
  const { userId } = req.params;
  models.favorite.findAllFavoritesByUser(userId).then(([rows]) => {
    if (rows[0] == null) {
      res.sendStatus(404);
    } else {
      res.send(rows);
    }
  });
};

const deleteFavorite = (req, res) => {
  const { userId, announceId } = req.params;
  models.favorite
    .deleteFavorite(userId, announceId)
    .then(() => {
      res.status(200).json({ message: "Annonce supprimée des favoris" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err.errno,
      });
    });
};

const favorisCheck = (req, res) => {
  const { userId, announceId } = req.params;
  models.favorite.favorisCheck(userId, announceId).then(([rows]) => {
    if (rows[0] == null) {
      res.sendStatus(404);
    } else {
      res.send(rows);
    }
  });
};

module.exports = {
  browse,
  readFavorite,
  add,
  readFavoritebyUser,
  deleteFavorite,
  favorisCheck,
};

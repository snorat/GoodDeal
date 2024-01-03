const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const models = require("../models");

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.user
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

const edit = (req, res) => {
  // const id = req.params;
  const user = req.body;
  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const user = req.body;

  models.user
    .insert(user)
    .then(() => {
      res.status(200).json({ message: "Utilisateur crée avec succès" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err.errno,
      });
    });
};

const destroy = (req, res) => {
  const { id } = req.params;
  models.user
    .delete(id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = {
          sub: req.user.user_id,
          id: req.user.user_id,
          firstname: req.user.firstname,
          lastname: req.user.lastname,
          email: req.user.email,
          role: req.user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "3h",
        });

        res.cookie("authToken", token);

        res.status(200).json({
          message: "Connexion réussie",
          id: req.user.user_id,
          firstname: req.user.firstname,
          lastname: req.user.lastname,
          email: req.user.email,
          role: req.user.role,
        });
      } else {
        res.sendStatus(401);
      }
    });
};

const deconnect = (req, res) => {
  res.clearCookie("authToken").sendStatus(200);
};

const allowAccess = (req, res) => {
  res.status(200).json("Accès autorisé");
};

const avatar = (req, res) => {
  models.user
    .selectAvatar(req.params.id)
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
  browse,
  read,
  edit,
  add,
  destroy,
  avatar,
  verifyPassword,
  allowAccess,
  deconnect,
};

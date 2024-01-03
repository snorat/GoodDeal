const argon2 = require("argon2");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const models = require("../models");

const checkIfGoodUser = (req, res, next) => {
  const { email, password } = req.query;

  if (email === "admin@gmail.com" && password === "secret") {
    next();
  } else {
    res
      .status(403)
      .send(`Désolé ! Vous n'êtes pas autorisé à accéder à cette route...`);
  }
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const userSchema = Joi.object({
  firstname: Joi.string().alphanum().min(3).max(50),
  lastname: Joi.string().alphanum().min(3).max(50),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

const checkEmailIfExist = (req, res, next) => {
  const { email } = req.body;

  models.user.searchByEmail(email).then(([user]) => {
    if (user.length !== 0) {
      // eslint-disable-next-line prefer-destructuring
      req.user = {
        user_id: user[0].user_id,
        email: user[0].email,
        firstname: user[0].firstname,
        lastname: user[0].lastname,
        role: "user",
        hashedPassword: user[0].hashedPassword,
      };
      next();
    } else {
      res.sendStatus(401);
    }
  });
};

const checkIfIsAllowed = (req, res, next) => {
  try {
    const { authToken } = req.cookies;

    if (!authToken) {
      return res.status(401).send("Désolé, mais c'est ciao !");
    }

    const payload = jwt.verify(authToken, process.env.JWT_SECRET);

    req.user = payload;

    return next();
  } catch (error) {
    console.error("Erreur lors de la vérification du token :", error);
    return res.sendStatus(401);
  }
};

const checkIfGoodId = (req, res, next) => {
  const { userId } = req.params;
  if (req.user.id !== parseInt(userId, 10)) {
    res.status(401).send("Accès interdit");
  } else {
    next();
  }
};
const checkIfGoodIdBody = (req, res, next) => {
  const userId = req.params.id;
  console.info("userID", userId);
  console.info("user_id", req.user.id);
  if (req.user.id !== parseInt(userId, 10)) {
    res.status(401).send("Accès interdit");
  } else {
    next();
  }
};
const checkIfUser = (req, res, next) => {
  if (req.user.role !== "user") {
    res.status(500).send("Tu n'es pas authorisé user");
  } else {
    next();
  }
};
module.exports = {
  checkIfGoodUser,
  validateUser,
  hashPassword,
  checkEmailIfExist,
  checkIfIsAllowed,
  checkIfUser,
  checkIfGoodId,
  checkIfGoodIdBody,
};

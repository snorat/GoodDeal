const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = {
          sub: req.user.user_id,
          email: req.user.email,
          id: req.user.user_id,
          firstname: req.user.firstname,
          lastname: req.user.lastname,
          role: req.user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "3h",
        });

        res.cookie("authToken", token);

        res.status(200).json({
          message: "Connexion réussie",
          id: req.user.user_id,
          email: req.user.email,
          firstname: req.user.firstname,
          lastname: req.user.lastname,
          role: req.user.role,
        });
      } else {
        res.sendStatus(401);
      }
    });
};

const allowAccess = (req, res) => {
  res.status(200).json("Accès autorisé");
};

module.exports = { verifyPassword, allowAccess };

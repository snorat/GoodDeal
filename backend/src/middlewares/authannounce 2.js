const Joi = require("joi");

const announceSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  title: Joi.string()
    .min(5)
    .max(100)
    .messages({
      "string.min": `Le titre doit comporter au moins 5 caractères.`,
      "string.max": `La titre ne doit pas dépasser 100 caractères.`,
      "string.empty": `Merci d'entrer un titre à votre annonce.`,
    })
    .required(),
  price: Joi.number()
    .min(1)
    .messages({
      "number.min": `Le prix de votre véhicule doit être d'au moins 1.`,
      "number.empty": `Merci d'entrer le prix de votre véhicule.`,
    })
    .required(),
  year: Joi.number()
    .integer()
    .min(1970)
    .max(new Date().getFullYear())
    .messages({
      "number.min": `L'année ne peut pas être inférieure à 1970.`,
      "number.max": `L'année ne peut pas être supérieure à l'année actuelle.`,
      "number.empty": `Merci d'entrer l'année de votre véhicule.`,
    })
    .required(),
  car_brand_id: Joi.number()
    .messages({
      "number.empty": `Merci de sélectionner la marque de votre véhicule.`,
    })
    .required(),
  car_model_id: Joi.number()
    .messages({
      "number.empty": `Merci de sélectionner le modéle de votre véhicule.`,
    })
    .required(),
  motorisation: Joi.string().required(),
  kilometer: Joi.number()
    .integer()
    .min(1)
    .messages({
      "number.min": `Les kilométres de votre véhicule doivent être d'au moins 1.`,
      "number.empty": `Merci d'entrer les kilométres de votre véhicule.`,
    })
    .required(),
  transmission: Joi.string().required(),
  car_type_id: Joi.number().required(),
  power: Joi.number()
    .integer()
    .min(1)
    .messages({
      "number.min": `La puissance doit être d'au moins 1.`,
      "number.empty": `Merci d'entrer la puissance de votre véhicule.`,
    })
    .required(),
  state: Joi.string().required(),
  license: Joi.string().required(),
  description: Joi.string()
    .min(10)
    .max(500)
    .messages({
      "string.min": `La description doit avoir au moins 10 caractères.`,
      "string.max": `La description ne doit pas dépasser 500 caractères.`,
      "string.empty": `Merci d'entrer la description de votre véhicule.`,
    })
    .required(),

  contact: Joi.string()
    .regex(/^[0-9]{10}$/)
    .min(10)
    .messages({
      "string.pattern.base": `Le numéro de téléphone doit avoir 10 caractères.`,
      "string.empty": `Merci d'entrer un numéro de téléphone valide.`,
    })
    .required(),
  city: Joi.string()
    .messages({
      "string.empty": `Merci d'entrer votre ville.`,
    })
    .required(),
  postalcode: Joi.string()
    .regex(/^[0-9]{5}$/)
    .min(5)
    .messages({
      "string.pattern.base": `Le code postal doit comporter 5 chiffres.`,
      "string.empty": `Le code postal est requis.`,
    })
    .required(),
});

const validateAnnounce = (req, res, next) => {
  const { error } = announceSchema.validate(req.body);
  console.info(error);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

module.exports = {
  validateAnnounce,
};

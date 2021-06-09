const Joi = require("joi");
const { baseValidatorForBody } = require("./index");

const validateAdminSignup = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.number().required(),
    country: Joi.string().required(),
    address: Joi.string().required(),
  });
  baseValidatorForBody(schema, req, res, next);
};

const validateAdminLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  baseValidatorForBody(schema, req, res, next);
};

module.exports = {
  validateAdminSignup,
  validateAdminLogin,
};

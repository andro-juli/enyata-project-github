const Joi = require("joi");

const { baseValidatorForBody } = require("./index");

const validateNewApplicant = (req, res, next) => {
  const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    DOB: Joi.string().required(),
    address: Joi.string().required(),
    university: Joi.string().required(),
    program: Joi.string().required(),
    CGPA: Joi.number().required(),
    image_cv: Joi.string().required(),
  });
  baseValidatorForBody(schema, req, res, next);
};

module.exports = {
  validateNewApplicant,
};

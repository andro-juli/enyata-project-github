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
const validateCreatedApplication = (req, res, next) => {
  const schema = Joi.object({
    batch_id: Joi.number().required(),
    link: Joi.string().required(),
    instructions: Joi.string().required(),
    file_url: Joi.string().required(),
    app_closure_date: Joi.string().required(),
  });
  baseValidatorForBody(schema, req, res, next);
};

const validateQuestions = (req, res, next) => {
  const schema = Joi.object({
    question_number: Joi.number().required(),
    question_text: Joi.string().required(),
    answerA: Joi.string().required(),
    answerB: Joi.string().required(),
    answerC: Joi.string().required(),
    answerD: Joi.string().required(),
    correct_answer: Joi.string().required(),
  });
  baseValidatorForBody(schema, req, res, next);
};

module.exports = {
  validateAdminSignup,
  validateAdminLogin,
  validateCreatedApplication,
  validateQuestions,
};

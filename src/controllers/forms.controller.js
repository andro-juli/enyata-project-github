const FormService = require("../services/form.services");

const getAllForms = async (req, res, next) => {
  try {
    const response = await FormService.getAllForms();
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};

const addForm = async (req, res, next) => {
  try {
    const response = await FormService.addForm(req.body);
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};

const updateForm = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await FormService.updateForm(id, req.body);
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};

const deleteForm = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await FormService.deleteForm(id);
    return res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllForms,
  addForm,
  updateForm,
  deleteForm,
};

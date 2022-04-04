const SalesModel = require('../models/salesModels');

const getAll = async () => {
  const result = await SalesModel.getAll();
  return result;
};

const getById = async (id) => {
  if (!id) return false;

  const result = await SalesModel.getById(id);
  if (!result || result.length === 0) return false;
  return result;
};

const create = async (array) => {
  const result = await SalesModel.create(array);
  return result;
};

const update = async (id, productUpdate) => {
  const updateProduct = await SalesModel.update(id, productUpdate);

  return updateProduct;
};

const deleteById = async (saleId) => {
  const result = await SalesModel.getById(saleId);
  if (!result.length) return false;

  await SalesModel.deleteById(saleId);
  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};

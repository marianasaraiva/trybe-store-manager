const SalesModel = require('../models/salesModels');

// const isValid = (name, quantity) => {
//   if (!name || typeof name !== 'string') return false;
//   if (!quantity || typeof quantity !== 'number') return false;
//   return true;
// };

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
  // const newSale = await SalesModel.getById(id);
  // if (newSale.length) return false;
  
  const result = await SalesModel.create(array);

  return result;
};

module.exports = {
  getAll,
  getById,
  create,
};

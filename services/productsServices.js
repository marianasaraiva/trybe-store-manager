const ProductModel = require('../models/productsModels');

// const isValid = (name, quantity) => {
//   if (!name || typeof name !== 'string') return false;
//   if (!quantity || typeof quantity !== 'number') return false;
//   return true;
// };

const getAll = async () => {
  const result = await ProductModel.getAll();

  return result;
};

const getById = async (id) => {
  if (!id) return false;

  const result = await ProductModel.getById(id);

  return result;
};

module.exports = {
  getAll,
  getById,
};

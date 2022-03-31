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

const create = async ({ name, quantity }) => {
  const newProductValid = await ProductModel.getByName(name);
  console.log(newProductValid);
  if (newProductValid.length) return false;
  
  const { id } = await ProductModel.create({ name, quantity });

  return {
    id,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  getById,
  create,
};

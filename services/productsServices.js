const ProductModel = require('../models/productsModels');

const getAll = async () => {
  const result = await ProductModel.getAll();

  return result;
};

const getById = async (id) => {
  if (!id) return false;

  const result = await ProductModel.getById(id);

  return result[0];
};

const create = async ({ name, quantity }) => {
  const newProductValid = await ProductModel.getByName(name);
  if (newProductValid.length) return false;

  const { id } = await ProductModel.create({ name, quantity });

  return {
    id,
    name,
    quantity,
  };
};

const update = async ({ id, name, quantity }) => {
  const result = await ProductModel.getById(id);
  if (!result.length) return false;

  const updateProduct = await ProductModel.update({ id, name, quantity });

  return updateProduct;
};

const deleteById = async (id) => {
  const result = await ProductModel.getById(id);
  if (!result.length) return false;

  const deleteProduct = await ProductModel.deleteById(id);

  return deleteProduct;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};

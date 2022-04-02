const ProductService = require('../services/productsServices');

const getAll = async (req, res, next) => {
  try {
    const product = await ProductService.getAll();

    if (!product) {
      return res.status(404).json({ message: 'Nenhum produto retornado' });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productById = await ProductService.getById(id);

    if (!productById) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(productById);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const product = await ProductService.create({ name, quantity });

    if (!product) {
      return res.status(409).json({ message: 'Product already exists' });
    }

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const updateProduct = await ProductService.update({ id, name, quantity });
    
    if (updateProduct === false) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updateProduct);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productById = await ProductService.deleteById(id);
    
    if (productById === false) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};

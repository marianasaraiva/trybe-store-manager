const ProductService = require('../services/productsServices');

const getAll = async (req, res, next) => {
  try {
    const product = await ProductService.getAll();
  
    if (!product) {
      return res.status(400).send({ message: 'Nenhum produto retornado' });
    }
  
    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productById = await ProductService.getById(id);
  
    if (!productById) {
      return res.status(400).send({ message: 'Product not found' });
    }
  
    return res.status(200).send(productById);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
};

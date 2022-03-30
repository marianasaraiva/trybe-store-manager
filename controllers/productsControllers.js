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

module.exports = {
  getAll,
  getById,
};

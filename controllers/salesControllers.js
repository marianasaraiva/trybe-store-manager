const SaleService = require('../services/salesServices');

const getAll = async (req, res, next) => {
  try {
    const sale = await SaleService.getAll();
  
    if (!sale) {
      return res.status(404).json({ message: 'Nenhuma sale retornada' });
    }
  
    res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const saleById = await SaleService.getById(id);
  
    if (!saleById) {
      return res.status(404).json({ message: 'Sale not found' });
    }
  
    return res.status(200).json(saleById);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const sale = await SaleService.create(req.body);
    
    // if (!sale) {
    //   return res.status(409).json({ message: 'Product already exists' });
    // }

    res.status(201).json(sale);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
};

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
    res.status(201).json(sale);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productUpdate = req.body[0];
    productUpdate.saleId = id;

    const updateProduct = await SaleService.update(productUpdate);

    res.status(200).json(updateProduct);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const saleById = await SaleService.deleteById(id);
    console.log('controller delete', saleById);

    if (!saleById) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    return res.status(204).end();
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

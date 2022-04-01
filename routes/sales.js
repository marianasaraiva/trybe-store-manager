const express = require('express');

const router = express.Router();

const SaleController = require('../controllers/salesControllers');
const validationSale = require('../middlewares/sales');

router.get('/:id', SaleController.getById);
router.get('/', SaleController.getAll);
router.post('/', validationSale, SaleController.create);
router.put('/:id', validationSale, SaleController.update);

module.exports = router;
const express = require('express');

const router = express.Router();

const SaleController = require('../controllers/salesControllers');

router.get('/:id', SaleController.getById);
router.get('/', SaleController.getAll);
router.post('/', SaleController.create);
router.put('/:id', SaleController.update);

module.exports = router;
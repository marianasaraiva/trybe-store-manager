const express = require('express');

const router = express.Router();

const SaleController = require('../controllers/salesControllers');

router.get('/', SaleController.getAll);

router.get('/:id', SaleController.getById);

module.exports = router;
const express = require('express');

const router = express.Router();

const ProductController = require('../controllers/productsControllers');

router.get('/', ProductController.getAll);

router.get('/:id', ProductController.getById);

router.post('/', ProductController.create);

router.put('/:id', ProductController.update);

module.exports = router;
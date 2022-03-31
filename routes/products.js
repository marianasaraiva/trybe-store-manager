const express = require('express');

const router = express.Router();

const ProductController = require('../controllers/productsControllers');
const validationProducts = require('../middlewares/products');

router.get('/:id', ProductController.getById);
router.put('/:id', validationProducts, ProductController.update);
router.delete('/:id', ProductController.deleteById);
router.get('/', ProductController.getAll);
router.post('/', validationProducts, ProductController.create);

module.exports = router;
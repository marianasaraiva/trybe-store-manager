const express = require('express');

const router = express.Router();

const ProductController = require('../controllers/productsControllers');

router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.deleteById);
router.get('/:id', ProductController.getById);
router.get('/', ProductController.getAll);
router.post('/', ProductController.create);

module.exports = router;
const Joi = require('joi');

const productSchema = Joi.object().keys({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(0).required(),
});

const saleSchema = Joi.object().keys({
  productId: Joi.number().required(),
  quantity: Joi.number().min(0).required(),
});

module.exports = { productSchema, saleSchema };
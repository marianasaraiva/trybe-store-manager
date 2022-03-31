const Joi = require('joi');

const saleSchema = Joi.array({
  productId: Joi.number().min(0).required(),
  quantity: Joi.number().min(0).required(),
});

const validationSale = (req, res, next) => {
  const { error } = saleSchema.validate(req.body);
  if (error) throw error;
  next();
};

module.exports = validationSale;
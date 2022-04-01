const Joi = require('joi');

const productSaleSchema = Joi.object({
  productId: Joi.number().min(0).required(),
  quantity: Joi.number().min(1).required(),
});

// const salesSchema = Joi.array().items(productSaleSchema);

const validationSale = (req, res, next) => {
  const [teste] = req.body;
  console.log('body', teste);
  // console.log('salesSchema', salesSchema);
  // console.log(req.body);
  const { error } = productSaleSchema.validate(teste);
  console.log('error message', error.message);
  if (error) throw error;
  next();
};

module.exports = validationSale;

const Joi = require('joi');

const productSaleSchema = Joi.object({
  productId: Joi.number().min(0).required(),
  quantity: Joi.number().min(1).required(),
});

const validationSale = (req, res, next) => {
  const [teste] = req.body;
  const { error } = productSaleSchema.validate(teste);

  if (error) { 
    console.log('aqui');
    throw error;
  }
  next();
};

module.exports = validationSale;

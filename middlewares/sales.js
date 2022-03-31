const Joi = require('joi');

const productSaleSchema = Joi.object({
  productId: Joi.number().min(0).required(),
  quantity: Joi.number().min(0).required(),
});

const salesSchema = Joi.array().items(productSaleSchema);

const validationSale = (req, res, next) => {
  const { error } = salesSchema.validate(req.body);
  if (error) throw error;
  next();
};

module.exports = validationSale;

// let Joi = require('joi')
// let service = Joi.object().keys({
//   serviceName: Joi.string().required(),
// })

// let services = Joi.array().items(service)

// let test = Joi.validate(
//   [{ serviceName: 'service1' }, { serviceName: 'service2' }],
//   services,
// )
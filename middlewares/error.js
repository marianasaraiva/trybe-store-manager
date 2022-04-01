module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    const statusCode = err.details[0].type;
    const result = (statusCode === 'any.required') ? '400' : '422';

    return res.status(result).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Erro na aplicação!' });
};

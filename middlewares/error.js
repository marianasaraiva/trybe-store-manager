module.exports = (err, _req, res, _next) => {
  console.log(err.message);
  if (err.isJoi) {
    console.log('Aqui');
    const statusCode = err.details[0].type;
    const result = (statusCode === 'any.required') ? '400' : '422';

    return res.status(result).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Erro na aplicação!' });
};

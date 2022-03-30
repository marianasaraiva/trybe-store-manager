module.exports = (err, req, res, _next) => {
  console.log(err.message);
  return res.status(500).json({ message: 'Erro na aplicação!' });
};

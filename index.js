const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const products = require('./routes/products');
const sales = require('./routes/sales');
// const error = require('./middlewares/error');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', products);
app.use('/sales', sales);

// app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT s.id AS saleId, s.date, sp.product_id AS productId, sp.quantity
  FROM StoreManager.sales s
  INNER JOIN StoreManager.sales_products sp
  ON s.id = sp.sale_id
  ORDER BY s.id`;
  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  // const query = 'SELECT * FROM StoreManager.sales WHERE id = ?';
  const query = `SELECT s.date, sp.product_id AS productId, sp.quantity
  FROM 
    StoreManager.sales s
  INNER JOIN 
    StoreManager.sales_products sp
  ON
    s.id = sp.sale_id
  WHERE sp.sale_id = ?
  ORDER BY s.id, sp.product_id`;
  const [result] = await connection.execute(query, [id]);
  return result;
};

const create = async (array) => {
  const query1 = 'INSERT INTO StoreManager.sales (id) VALUES (null)';
  const [resultId] = await connection.execute(query1);

  const query2 = `INSERT INTO StoreManager.sales_products (product_id, quantity, sale_id)
  VALUES (?, ?, ?)`;
  const result = array.map(({ productId, quantity }) => 
    connection.execute(query2, [productId, quantity, resultId.insertId]));
  await Promise.all(result);
  return {
    id: resultId.insertId,
    itemsSold: array,
  };
};

module.exports = {
  getAll,
  getById,
  create,
};

const { connection } = require('./connection');

const getAllProducts = async () => connection()
  .then((db) => db
    .getTable('products')
    .select(['id', 'name', 'price', 'url_image'])
    .execute())
  .then((results) => results.fetchAll())
  .then((products) => products.map(([id, name, price, image]) => ({ id, name, price, image })));

module.exports = {
  getAllProducts,
};

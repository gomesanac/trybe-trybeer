const { connection, connNew } = require('./connection');

const registerSale = async (
  userId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  saleDate,
  status,
) => connection().then((db) => db
  .getTable('sales')
  .insert([
    'user_id',
    'total_price',
    'delivery_address',
    'delivery_number',
    'sale_date',
    'status',
  ])
  .values(
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
  )
  .execute());

const registerProductSold = async (saleId, productId, quantity) => connection().then((db) => db
  .getTable('sales_products')
  .insert(['sale_id', 'product_id', 'quantity'])
  .values(saleId, productId, quantity)
  .execute());

const getAllOrders = async () => connection()
  .then((db) => db
    .getTable('sales')
    .select([
      'id',
      'total_price',
      'delivery_address',
      'delivery_number',
      'status',
    ])
    .execute())
  .then((result) => result.fetchAll())
  .then((orders) => orders.map(
    ([
      orderNumber,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      status,
    ]) => ({
      orderNumber,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      status,
    }),
  ));

const getAllClientOrders = async (id) => connection()
  .then((db) => db
    .getTable('sales')
    .select(['id', 'total_price', 'sale_date'])
    .where('user_id = :id')
    .bind('id', id)
    .execute())
  .then((results) => results.fetchAll())
  .then((orders) => orders.map(([orderNumber, totalPrice, saleDate]) => ({
    orderNumber,
    totalPrice,
    saleDate,
  })));

const getSalesDetailsByID = async (saleId) => {
  try {
    const joinQuery = `SELECT sales.*, sproducts.product_id AS sold_product_id, sproducts.quantity AS sold_quantity, products.name AS product_name, products.price AS product_price, products.url_image AS product_image FROM Trybeer.sales_products AS sproducts INNER JOIN Trybeer.sales AS sales ON sproducts.sale_id = sales.id AND sales.id = ${saleId} INNER JOIN Trybeer.products AS products ON sproducts.product_id = products.id ORDER BY sales.id`;

    const searchQuery = await connNew(joinQuery);

    const results = await searchQuery.fetchAll();
    const salesResults = results.reduce(
      (
        acc,
        [
          id,
          userID,
          totalPrice,
          deliveryAddress,
          deliveryNumber,
          saleDate,
          status,
          soldProductID,
          soldQuantity,
          productName,
          productPrice,
          productImage,
        ],
      ) => [
        ...acc,
        {
          saleID: id,
          userID,
          orderValue: totalPrice,
          deliveryAddress,
          deliveryNumber,
          saleDate: new Date(saleDate).toISOString(),
          status,
          soldProductID,
          soldQuantity,
          productName,
          productPrice,
          productImage,
        },
      ],
      [],
    );

    return salesResults;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateOrderStatus = async (id) => connection().then((db) => db
  .getTable('sales')
  .update()
  .set('status', 'Entregue')
  .where('id = :id')
  .bind('id', id)
  .execute());

module.exports = {
  registerSale,
  registerProductSold,
  getAllOrders,
  getAllClientOrders,
  getSalesDetailsByID,
  updateOrderStatus,
};

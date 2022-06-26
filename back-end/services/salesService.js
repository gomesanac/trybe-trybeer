const { salesModel } = require('../models');

const registerSale = async (
  userId,
  totalPrice,
  delivery,
  saleDate,
  status,
  products,
) => {
  const { address, number } = delivery;

  const sale = await salesModel.registerSale(
    userId,
    totalPrice,
    address,
    number,
    saleDate,
    status,
  );

  const saleId = sale.getAutoIncrementValue();

  if (!sale) {
    return {
      err: {
        code: 'invalid_entries',
        message: 'The sale could not be registered',
      },
    };
  }

  await Promise.all(
    products.map(({ id, amount }) => salesModel.registerProductSold(saleId, id, amount)),
  );

  return { message: 'Compra realizada com sucesso!' };
};

const salesDetailsById = async (saleID) => {
  try {
    const sales = await salesModel.getSalesDetailsByID(saleID);
    const salesData = sales.length ? { saleID: sales[0].saleID,
      userID: sales[0].userID,
      orderValue: sales[0].orderValue,
      deliveryAddress: sales[0].deliveryAddress,
      deliveryNumber: sales[0].deliveryNumber,
      saleDate: sales[0].saleDate,
      status: sales[0].status,
      products: sales.map(({ soldProductID,
        soldQuantity,
        productName,
        productPrice,
        productImage }) => ({
        soldProductID,
        soldQuantity,
        productName,
        productPrice,
        productImage,
      })) } : {};

    return { ...salesData };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllOrders = async () => salesModel.getAllOrders();

const getAllClientOrders = async (id) => salesModel.getAllClientOrders(id);

const updateOrderStatus = async (id) => salesModel.updateOrderStatus(id);

module.exports = {
  registerSale,
  getAllOrders,
  getAllClientOrders,
  salesDetailsById,
  updateOrderStatus,
};

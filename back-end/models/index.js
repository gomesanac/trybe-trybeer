const { connection } = require('./connection');
const usersModel = require('./usersModel');
const clientsModel = require('./clientsModel');
const productsModel = require('./productsModel');
const salesModel = require('./salesModel');

module.exports = {
  connection,
  usersModel,
  clientsModel,
  productsModel,
  salesModel,
};

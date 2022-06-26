require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
  userLogin,
  registerUser,
  updateClientName,
  getAllProducts,
  registerSale,
  getOneOrder,
  getAllOrders,
  getAllClientOrders,
  updateOrderStatus,
} = require('./controllers');
const { validateJWT } = require('./middlewares');
const { connection } = require('./models/connection');

const PORT = process.env.API_PORT || 3001;

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/images', express.static(`${process.cwd()}/images`));

app.post('/login', userLogin);

app.post('/register', registerUser);

app.put('/update-client-name', validateJWT, updateClientName);

app.get('/products', validateJWT, getAllProducts);

app.post('/checkout', validateJWT, registerSale);

app.get('/admin/orders', validateJWT, getAllOrders);

app.get('/orders', validateJWT, getAllClientOrders);

app.put('/orders/:id', validateJWT, updateOrderStatus);

app.get('/search/:id', validateJWT, getOneOrder);

app.listen(PORT, () => console.log(`Listen on ${PORT}`));

connection().then(() => console.log(
  `Banco conectado via: ${process.env.MYSQL_USER}@${process.env.HOSTNAME};`,
));

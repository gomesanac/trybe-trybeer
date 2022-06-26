import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MenuTop from '../components/MenuTop';
import { getOneOrder } from '../services/ordersService';
import formatDate from '../utils/formatDate';
import formatPrice from '../utils/formatPrice';
import { getFromLocalStorage } from '../utils/saveToLocalStorage';
import Sidebar from '../components/Sidebar.jsx';

function ClientOrderDetail({ match }) {
  const [order, setOrder] = useState(null);
  const user = getFromLocalStorage();

  const token = user ? user.token : '';
  const { id } = match.params;

  const fetchOrder = async (id, token) =>
    getOneOrder(id, token).then((order) => setOrder(order.sale));

  useEffect(() => {
    fetchOrder(id, token);
  }, []);

  if (!user) return <Redirect to="/login" />;

  return (
    <div>
      <MenuTop pageTitle="Detalhes de Pedido" />
      <Sidebar />
      <div id="wrapper" className="order-details-page container">
        {order && order.products ? (
          <div className="card">
            <div className="card-header">
              <h3
                className="card-text"
                data-testid="order-number"
              >{`Pedido ${order.saleID}`}</h3>
              <p className="card-text" data-testid="order-date">
                {formatDate(order.saleDate)}
              </p>
            </div>
            <ul className="list-group list-group-flush">
              {order.products && order.products.map(
                (
                  { soldProductID, soldQuantity, productName, productPrice },
                  index
                ) => (
                  <li className="list-group-item" key={soldProductID}>
                    <div>
                      <h4 data-testid={`${index}-product-name`}>
                        {productName}
                      </h4>
                      <p
                        data-testid={`${index}-product-qtd`}
                      >{`Quantidade: ${soldQuantity}`}</p>
                      <p data-testid={`${index}-product-total-value`}>
                        {`Total do produto: R$ ${formatPrice(
                          productPrice * soldQuantity
                        )}`}
                      </p>
                    </div>
                  </li>
                )
              )}
            </ul>
            <div className="card-footer">
              <h3 className="card-text" data-testid="order-total-value">
                {`Total: R$ ${order.orderValue ? formatPrice(order.orderValue): '0,00'}`}
              </h3>
            </div>
          </div>
        ) : (
          <h1 className="text-center message-geral">{order ? 'O pedido não foi encontrado' : 'Loading...'}</h1>
        )}
      </div>
    </div>
  );
}

export default ClientOrderDetail;

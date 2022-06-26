import React, {useEffect, useState} from 'react';
import AdminMenuSideBar from '../components/AdminMenuSideBar';
import {getAllAdminOrders} from '../services/ordersService';
import {getFromLocalStorage} from '../utils/saveToLocalStorage';
import formatPrice from '../utils/formatPrice';


function AdminOrders() {
  const [orders, setOrders] = useState(null);
  const user = getFromLocalStorage();

  const token = user ? user.token : '';

  const onCardClick = (orderNumber) => window.location.href = `/admin/orders/${orderNumber}`;

  useEffect(() => {
    getAllAdminOrders(token).then((result) => setOrders(result));
  }, []);

  return (
    <div className="d-flex">
      <AdminMenuSideBar />
      <div className="orders-list container">
        {orders && orders.map(
          (
            { orderNumber, totalPrice, deliveryAddress, deliveryNumber, status },
            index
          ) => {
            return (
              <div
                className="card product-card"
                data-testid={`${index}-order-card-container`}
                key={index}
              >
                <div className="card-body" onClick={() => onCardClick(orderNumber)}>
                  <h5
                    className="card-title"
                    data-testid={`${index}-order-number`}
                  >{`Pedido ${orderNumber}`}</h5>

                  <h6 className="card-text" data-testid={`${index}-order-address`}>
                    {`Rua ${deliveryAddress}, ${deliveryNumber}`}
                  </h6>

                  <h5
                    className="card-text"
                    data-testid={`${index}-order-total-value`}
                  >{`R$ ${formatPrice(totalPrice)}`}</h5>

                  <h6
                    className="card-text"
                    data-testid={`${index}-order-status`}
                  >{status}</h6>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default AdminOrders;

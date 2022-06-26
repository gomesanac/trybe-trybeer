import React from 'react';
import PropTypes from 'prop-types';
import OrderCard from './OrderCard';

function ListOrdersCards({ orders }) {
  return (
    <div id="wrapper" className="product-page orders-list" style={{display: "flex", flexDirection: "row"}}>
      {orders.map((order, index) => (
        <OrderCard order={order} index={index} key={order.orderNumber} />
      ))}
    </div>
  );
}

export default ListOrdersCards;

ListOrdersCards.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      orderNumber: PropTypes.number,
      totalPrice: PropTypes.number,
      saleDate: PropTypes.number,
    })
  ).isRequired,
};

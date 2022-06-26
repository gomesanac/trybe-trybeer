const decimal = 2;

const formatPrice = (price) => {
  const priceString = price.toFixed(decimal).toString();
  const priceArray = priceString.split('.');
  const newPrice = priceArray.join(',');
  return newPrice;
};

export default formatPrice;

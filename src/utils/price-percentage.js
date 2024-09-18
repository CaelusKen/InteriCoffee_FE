export const calculatePercentSale = (price, salePrice) => {
    const discountAmount = price - salePrice;
    const percentSale = (discountAmount / price) * 100;
    return percentSale.toFixed(0); // Returns the percentage discount rounded to 2 decimal places
  };
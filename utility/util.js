const MIN_PRICE = 500, MAX_PRICE = 2000;
const generateStockValues2 = (old_price, volatile) => {
  let rnd = Math.random(); // generate number, 0 <= x < 1.0

  let change_percent = 2 * volatile * rnd;

  if (change_percent > volatile) change_percent -= (2 * volatile);
  const change_amount = old_price * change_percent / 100;
  let new_price = old_price + change_amount;

  if (new_price < MIN_PRICE) {
    new_price += Math.abs(change_amount) * 2;
  } else if (new_price > MAX_PRICE) {
    new_price -= Math.abs(change_amount) * 2;
  }

  new_price = parseFloat(new_price.toFixed(2));

  return new_price;
}

module.exports = {
  getDateTime: () => {
    return new Date().toJSON().slice(0, 19).replace('T', ' ')
  },
  generateStockValues: (volatile, time, old_price = 500) => {
    return {
      time,
      price: generateStockValues2(old_price, volatile),
      // price: 100 + Math.floor(Math.random() * parseInt(stock_id) * 19),
      traded: Math.floor(Math.random() * 1000)
    };
  }
};

const stocks = require('./stocks');

module.exports = (express,app) => {
  const router = express.Router();

  return {
    stocks : stocks(router)
  }
}
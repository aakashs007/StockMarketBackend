const { stocksController } = require('../controllers');

module.exports = (router) => {

  router.get(
    '/stocks/current/:stock_id',
    stocksController.getCurrentStocksPrice
  );

  router.get(
    '/stocks/top/:n',
    stocksController.getTopStocksGainLoss
  );

  router.get(
    '/stocks/list',
    stocksController.getStockssListing
  );

  router.get(
    '/stocks/data/:stock_id',
    stocksController.getStockData
  );

  return router;
}
const Logger = require('../../../utility/app-logger');
const Locals = require('../providers/locals').config();
const HanlderController = require('./handlerController');

class StocksController {

  async getCurrentStocksPrice(request, response, next) {
    try {
      const stock_id = parseInt(request.params.stock_id);
      if(!stock_id) throw 'Stock Id not present';

      const stockCollections = request.db.collection('stocks');

      const projection = {
        _id: 0,
        values_with_time: 0
      };

      const stock = await stockCollections.findOne({ stock_id },{ projection });

      HanlderController.sendResponse(request, response, 200, stock);
    } catch(err) {
      Logger.error(`Error occured in getCurrentStocksPrice: ${err}`);
      HanlderController.sendResponse(request, response, 500, err);
    }
  }

  async getTopStocksGainLoss(request, response, next) {
    try {
      const total_n = parseInt(request.params.n || 10);

      const stockCollections = request.db.collection('stocks');

      const [ gainers,losers ] = await Promise.all([
        stockCollections.find().sort({ per_chng: -1 }).limit(total_n).toArray(),
        stockCollections.find().sort({ per_chng: 1 }).limit(total_n).toArray(),
      ]);

      const data = { gainers,losers };

      HanlderController.sendResponse(request, response, 200, data);
    } catch(err) {
      Logger.error(`Error occured in getTopStocksGainLoss: ${err}`);
      HanlderController.sendResponse(request, response, 500, err);
    }
  }

  async getStockssListing(request, response, next) {
    try {
      const page = request.query.page || 1;
      const limit = request.query.limit || 10;
      const skip = (page-1)*limit;

      const stockCollections = request.db.collection('stocks');

      const projection = {
        _id: 0,
        stock_id: 1,
        stock_name: 1,
        price: 1,
        close: 1,
        open: 1,
        high: 1,
        low: 1
      };

      const stocks = await stockCollections.find({},{ projection }).limit(parseInt(limit)).skip(parseInt(skip)).toArray();

      HanlderController.sendResponse(request, response, 200, stocks);
    } catch(err) {
      Logger.error(`Error occured in getStockssListing: ${err}`);
      HanlderController.sendResponse(request, response, 500, err);
    }
  }

  async getStockData(request, response, next) {
    try {
      const stock_id = parseInt(request.params.stock_id);
      if(!stock_id) throw 'Stock Id not present';

      const stockCollections = request.db.collection('stocks');

      const projection = {
        _id: 0,
      };

      const stock = await stockCollections.findOne({ stock_id },{ projection });

      HanlderController.sendResponse(request, response, 200, stock);      
    } catch(err) {
      HanlderController.sendResponse(request, response, 500, 'Error');
    }
  }

}

module.exports = new StocksController();
const CronJob = require('cron').CronJob;
const Logger = require('../../../utility/app-logger');
const STOCKS = require('../../../utility/STOCKS_CONSTANTS');
const { generateStockValues } = require('../../../utility/util');

const DB = {
  insertStocks: async (collection, time) => {
    const insert_stocks = [];

    for(let i=0;i<STOCKS.length;i++) {
      const volatile = 1 + Math.floor(Math.random() * 4);
      const stock_current_value = generateStockValues(volatile, time);

      const stock = {
        ...STOCKS[i],
        values_with_time: [ stock_current_value ],
        open: stock_current_value.price,
        ltp: stock_current_value.price,
        volume: stock_current_value.traded,
        high: stock_current_value.price,
        low: stock_current_value.price,
        price: stock_current_value.price,
        volatile,
        per_chng: null,
        close: null,
      };

      insert_stocks.push(stock);
    }

    collection.insertMany(insert_stocks,(err, result) => {
      if(!err) {
        Logger.info(`Inserted successfully ${result}`);
      } else {
        Logger.error(`Error occurred in insertion ${err}`);
      }
    });
  },

  updateStocks: async (collection, time) => {
    try {
      const all_stocks = await collection.find({}).toArray();
      const update_promises = [];

      for(let i=0;i<all_stocks.length;i++) {
        const stock_current_value = generateStockValues(all_stocks[i].volatile, time, all_stocks[i].ltp);

        delete all_stocks[i]._id;

        all_stocks[i].values_with_time.push(stock_current_value);

        if(all_stocks[i].high < stock_current_value.price) {
          all_stocks[i].high = stock_current_value.price;
        }

        if(all_stocks[i].low > stock_current_value.price) {
          all_stocks[i].low = stock_current_value.price;
        }

        all_stocks[i].volume += stock_current_value.traded;

        all_stocks[i].ltp = all_stocks[i].price;

        all_stocks[i].price = stock_current_value.price;

        all_stocks[i].per_chng = parseFloat((((all_stocks[i].price - all_stocks[i].ltp)/parseFloat(all_stocks[i].ltp)) * 100).toFixed(2));

        update_promises.push(collection.updateOne({ stock_id: all_stocks[i].stock_id },{ '$set': all_stocks[i] }));
      }

      await Promise.all(update_promises);

      Logger.info(`All stocks updated successfully!`);
    } catch(err) {
      Logger.error(`Error occured in updating docs: ${err}`);
    }
  }
};

module.exports = (database) => {
  const interval = '0 */1 10-16 * * *'; // run every 1 minute from 10 am to 4 pm

  const onTick = () => {
    const time = new Date();
    Logger.info(`Cron job ran on: ${time}`);
    const stockCollection = database.collection('stocks');

    stockCollection.countDocuments()
    .then(count => {

      if(!count) {
        DB.insertStocks(stockCollection,time);
      } else {
        DB.updateStocks(stockCollection,time);
      }
    }).catch(err => {
      Logger.error(`Error stock colleciont count ${err}`);
    })
  }

  const onComplete = () => {
    Logger.info(`Job execution completed at ${new Date()}`);
  }

  const timezone = 'Asia/Kolkata';

  const start = true;

  const job = new CronJob(interval, onTick, onComplete, start, timezone);

  job.start();

  // onTick();
};
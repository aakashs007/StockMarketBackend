const Locals = require('../providers/locals').config();
const Logger = require('../../../utility/app-logger');

const MongoClient = require('mongodb').MongoClient;
 
const { db_url, database } = Locals;
 

module.exports = async () => {
  try {
    const client = await MongoClient.connect(db_url, { useUnifiedTopology: true});
    Logger.info("Connected successfully to the database server");

    const db = client.db(database);
    
    return db;
  } catch(err) {
    Logger.error(`Error occured in connected to database: ${err}`);
    process.exit(1);
  }
}
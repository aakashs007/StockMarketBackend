const Express = require('./express');
const Log = require('../../../utility/app-logger');
const Model = require('../models');
const CronJob = require('./cronjob');

class App {

  // clear console
  clearConsole () {
		process.stdout.write('\x1B[2J\x1B[0f');
  }

	async loadApp() {
		try {
			const database = await this.loadDatabase();

			this.loadServer(database);

			this.loadServices(database);
		} catch(err) {
			Log.error(`Error occured in loading app: ${err}`);
			process.exit(1);
		}
	}	

	// Loads the Database Pool
	loadDatabase () {
		Log.info('Database :: Booting @ Master...');

		const databse = Model();
		return databse;
	}

	// Loads your Server
	loadServer (database) {
		Log.info('Server :: Booting @ Master...');
		const EXPRESS = new Express(database);
		EXPRESS.init();
	}

	loadServices(database) {
		CronJob(database);
	}

}

module.exports = new App;

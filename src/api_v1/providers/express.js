/**
 * Primary file for your Clustered API Server
 *
 */

const express = require('express');
const Locals = require('./locals');
const Routes = require('./routes');
const Kernel = require('../middlewares/kernel');
const ExceptionHandler = require('../exception/handler');


class Express {
	/**
	 * Initializes the express server
	 */
	constructor (database) {
		this.express = express();

		this.mountDotEnv();
		this.mountMiddlewares();
		this.mountRoutes(database);
	}

	mountDotEnv () {
		this.express = Locals.init(this.express);
	}

	/**
	 * Mounts all the defined middlewares
	 */
	mountMiddlewares () {
		this.express = Kernel.init(this.express);
	}

	/**
	 * Mounts all the defined routes
	 */
	mountRoutes (database) {
		this.express = Routes.mountApi(this.express, express, database);
	}

	/**
	 * Starts the express server
	 */
	init () {
		const port = Locals.config().port;

		// Registering Exception / Error Handlers
		this.express.use(ExceptionHandler.logErrors);
		this.express.use(ExceptionHandler.clientErrorHandler);
		this.express = ExceptionHandler.notFoundHandler(this.express);

		// Start the server on the specified port
		this.express.listen(port, (_error) => {
			if (_error) {
				return console.log('Error: ', _error);
			}

			return console.log('\x1b[33m%s\x1b[0m', `Server :: Running @ 'http://localhost:${port}'`);
		});
	}
}

/** Export the express module */
module.exports = Express;

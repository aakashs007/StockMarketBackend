/**
 * Define all your routes
 *
 */

const Locals = require('./locals');
const apiRouter = require('../routes');

class Routes {

	mountApi(app, express, database) {
		const apiPrefix = Locals.config().apiPrefix;
		console.log('Routes :: Mounting API Routes...');

		const api_routes = apiRouter(express,app);

		app.use(`/${apiPrefix}/v1`, (req,res,next) => {
			req.db = database;
			next();
		});
		
		app.use(`/${apiPrefix}/v1`, api_routes.stocks);

		return app;
	}
	
}

module.exports = new Routes;

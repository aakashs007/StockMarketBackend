/**
 * Define the error & exception handlers
 *
 * @author Aakash Singh
 */
const Log = require('../../../utility/app-logger');

class Handler {
	/**
	 * Handles all the not found routes
	 */
	static notFoundHandler(_express) {
		_express.use('*', (req, res) => {
			const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

			Log.error(`Path '${req.originalUrl}' not found [IP: '${ip}']!`);

			return res.json({
				error: true,
				status: 404,
				msg: 'Url Not Found'
			});

		});

		return _express;
	}

	/**
	 * Handles your api/web routes errors/exception
	 */
	static clientErrorHandler(err, req, res, next) {
		if (req.xhr) {
			return res.status(500).send({ error: 'Something went wrong!' });
		} else {
			next(err);
		}
	}

	/**
	 * Register your error / exception monitoring
	 * tools right here ie. before "next(err)"!
	 */
	static logErrors(err, req, res, next) {
		Log.error(err.stack);

		next(err);
	}

}

module.exports = Handler;
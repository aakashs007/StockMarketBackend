/**
 * Register your Express middlewares
 *
 */

const CORS = require('./cors');
const Http = require('./http');
const Views = require('./views');
const Statics = require('./statics');

const Locals = require('../providers/locals');

class Kernel {
	static init (_express) {
		// Check if CORS is enabled
		if (Locals.config().isCORSEnabled) {
			// Mount CORS middleware
			_express = CORS.mount(_express);
		}

		// Mount basic express apis middleware
		_express = Http.mount(_express);

		// Mount csrf token verification middleware
		//_express = CsrfToken.mount(_express);

		// Mount view engine middleware
		_express = Views.mount(_express);

		// Mount statics middleware
		_express = Statics.mount(_express);

		return _express;
	}
}

module.exports = Kernel;
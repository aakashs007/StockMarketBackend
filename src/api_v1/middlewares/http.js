/**
 * Defines all the requisites in HTTP
 *
 */

const cors = require('cors');
const compress = require('compression');
const bodyParser = require('body-parser');
const Log = require('../../../utility/app-logger');
const Locals = require('../providers/locals');


class Http {
	static mount(_express) {
		Log.info('Booting the \'HTTP\' middleware...');

		// Enables the request body parser
		_express.use(bodyParser.json());

		_express.use(bodyParser.urlencoded({
			extended: false
		}));

		// Enables the CORS
		_express.use(cors());

		// Enables the "gzip" / "deflate" compression for response body
		_express.use(compress());

		return _express;
	}
}

module.exports = Http;

/**
 * Enables the CORS
 *
 */

const cors = require('cors');
const Log = require('../../../utility/app-logger');
const Locals = require('../providers/locals');

class CORS {
	mount(_express) {
		Log.info('Booting the \'CORS\' middleware...');
		_express.use(cors());
		return _express;
	}
}

module.exports = new CORS();
/**
 * Defines the view engines
 *
 */

 const path = require('path');
const Log = require('../../../utility/app-logger');

class Views {
	static mount(_express) {
		Log.info('Booting the \'Views\' middleware...');

		_express.set('view engine', 'pug');
		_express.set('view options', { pretty: true });
		_express.set('views', path.join(__dirname,'../','../','../','views'));
		_express.locals.pretty = true;

		return _express;
	}
}

module.exports = Views;

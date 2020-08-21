/**
 * Defines all the app-statics
 *
 */

const path = require('path');
const express = require('express');
const Log = require('../../../utility/app-logger');

class Statics {
	static mount(_express) {
		Log.info('Booting the \'Statics\' middleware...');

		// Load Statics
		_express.use('/public', express.static(path.join(__dirname, '../../public')));

		return _express;
	}
}

module.exports = Statics;

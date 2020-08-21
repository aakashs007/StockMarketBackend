/**
 * Defines the passport config
 *
 */

const passport = require('passport');
const LocalStrategy = require('../services/stratgies/local');
const JwtStrategy = require('../services/stratgies/jwt');


class Passport {
	mountPackage (_express) {
		_express = _express.use(passport.initialize());
		//_express = _express.use(passport.session());

		this.mountLocalStrategies();
		this.mountJwtStrategies();

		return _express;
	}
	
	mountJwtStrategies() {
		try {
			JwtStrategy(passport);
		} catch(err) {
			console.error(`Error Occured in local strategy init ${err}`);
		}
	}

	mountLocalStrategies() {
		try {
			LocalStrategy(passport);
		} catch (_err) {
			console.error("Error Occured in local strategy init");
		}
	}

	isAuthenticated (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}

		req.flash('errors', { msg: 'Please Log-In to access any further!'});
		return res.redirect('/login');
	}

	isAuthorized (req, res, next) {
		const provider = req.path.split('/').slice(-1)[0];
		const token = req.user.tokens.find(token => token.kind === provider);
		if (token) {
			return next();
		} else {
			return res.redirect(`/auth/${provider}`);
		}
	}
}

module.exports = new Passport;

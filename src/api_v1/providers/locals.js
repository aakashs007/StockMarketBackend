/**
 * Define App Locals & Configs
 *
 */

const path = require('path');
const ENV_FILE = '.env.dev';
const _path = (process.env.NODE_ENV == 'production') ? {} : {path: path.join(__dirname,'..','..','..',ENV_FILE)}
const dotenv = require('dotenv').config(_path);


class Locals {
	/**
	 * Makes env configs available for your app
	 * throughout the app's runtime
	 */
	static config() {
		//dotenv.config({ path: path.join(__dirname, '../../.env') });

		const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
		const port = process.env.PORT || 3005;

		const jwtExpiresIn = process.env.JWT_EXPIRES_IN || 3;
		const apiPrefix = process.env.API_PREFIX || 'api';

		const database = process.env.DATABASE || "";
		const db_user = process.env.DB_USER || "";
		const db_password = process.env.DB_PASSWORD || "";
		const db_url = process.env.DB_URL || "";

		const secret_key = process.env.SECRET_KEY || "";
		const token_expire_time = process.env.TOKEN_EXPIRE_TIME || "";
		const jwt_algo = process.env.JWT_ALGO || "";

		const logging = false;

		const language = process.env.language || 'en';

		return {
			apiPrefix,
			jwtExpiresIn,
			port,
			url,
			database,
			db_user,
			db_password,
			db_url,
			secret_key,
			token_expire_time,
			jwt_algo,
			logging,
			language			
		};
	}

	/**
	 * Injects your config to the app's locals
	 */
	static init (_express) {
		_express.locals.app = this.config();
		return _express;
	}
}

module.exports = Locals;
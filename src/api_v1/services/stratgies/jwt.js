const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Locals = require('../../providers/locals').config();

const options = {
  secretOrKey: Locals.secret_key,
  issuer: 'aakash',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports = (passport) => {
  passport.use(new JwtStrategy(options, async (token, done) => {
    try {
      //Pass the user details to the next middleware
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }));
}

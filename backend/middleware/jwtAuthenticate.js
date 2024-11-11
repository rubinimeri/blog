import passport from "../strategies/jwtStrategy.js";

const jwtAuthenticate = passport.authenticate('jwt', { session: false });

export { jwtAuthenticate };
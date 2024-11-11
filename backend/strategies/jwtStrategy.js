import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import prisma from '../prisma/prismaClient.js';
import { config } from 'dotenv';
config()

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}

passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
        const checkUser = await prisma.user.findUnique({
            where: {
                email: jwtPayload.email,
            }
        });

        if(!checkUser) {
            return done(null, false)
        }

        done(null, jwtPayload)
    } catch (error) {
        done(error, false)
    }
}))

export default passport;

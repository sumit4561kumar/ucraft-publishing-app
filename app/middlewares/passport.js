import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import jwt from 'jsonwebtoken'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { User } from '../db/models'

function initPassport () {
  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = 'secret'

  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  async function (email, password, done) {
    const user = await User.findOne({ where: { email } })
    if (user == null) {
      done('Email not registered!')
    } else {
      if (!await user.comparePassword(password)) {
        done('Incorrect Password')
      } else {
        const userObj = user.get({ plain: true })
        const jwtToken = await jwt.sign({ email, full_name: user.fullName, user_id: user.user_id },
          'secret', {
            expiresIn: "1d"
          })
        userObj.accessToken = jwtToken
        return done(null, userObj)
      }
    }
  })
  )

  passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    const user = await User.findOne({ where: { user_id: jwt_payload.user_id }, raw: true })
    if (user) {
      return done(null, user)
    } else {
      return done('User not found')
    }
  }))

  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (obj, done) {
    done(null, obj)
  })
}

module.exports = initPassport

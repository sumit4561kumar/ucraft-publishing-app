import Responder from '../../server/expressResponder'
import UserService from '../services/user.service'
import passport from 'passport'

export default class UserController {

  static async register (req, res) {
    try {
      await UserService.registerUser(req.body)
      Responder.success(res, {success: true, message: 'User registered Successfully!!'})
    } catch (error) {
      return res.status(400).json({ message: error})
    }
  }

  static async login (req, res) {
    passport.authenticate('login', (err, user) => {
      if (err) {
        return res.status(401).json({ message: err })
      }
      req.login(user, loginErr => {
        if (loginErr) {
          return res.status(401).send(loginErr)
        }

        Responder.success(res, {
          accessToken: user.accessToken,
          username: req.user.fullName,
          message: 'User logged in Successfully!!'
        })
      })
    })(req, res)
  }
}

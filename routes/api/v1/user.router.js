import express from 'express'
import userController from '../../../app/controllers/user.controller'

const args = { mergeParams: true }
const userRouter = express.Router(args)

userRouter.route('/register')
  .post(userController.register)

userRouter.route('/login')
  .post(userController.login)

export { userRouter }

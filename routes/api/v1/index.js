import express from 'express'
import { userRouter } from './user.router'

const router = express.Router()
const NAMESPACE = 'v1'

// User API
router.use(`/${NAMESPACE}/user`, userRouter)

export default router

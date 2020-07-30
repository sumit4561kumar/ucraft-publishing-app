import express from 'express'
import bodyParser from 'body-parser'
import expressBoom from 'express-boom'
import passport from 'passport'

import initRoutes from '../routes'
import db from '../app/db/models'
import initPassport from '../app/middlewares/passport'
import logger from './logger'
import path from 'path'
import http from 'http'
import { isAuthenticated } from '../app/middlewares/isAuthenticated'

// Initialize express app
const app = express()

const server = http.createServer(app);
const io = require('socket.io').listen(server)

io.on('connection', function (socket) {
  logger.info('=====A new User Connected======')

  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', `${data.username} is typing....`)
  })

  socket.on('disconnect', function () {
    logger.info('=====User Disconnected=====')
  })
})

function initMiddleware() {
  // Showing stack errors
  app.set('showStackError', true)

  //Configure view engine to render EJS templates.
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')

  app.use(expressBoom())

  // Request body parsing middleware
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  app.use(bodyParser.json({ limit: '1000mb' }))

  app.use(passport.initialize())
  app.use(passport.session())

  app.get('/', function (req, res) {
    res.render('index')
  })

  app.get('/login', function (req, res) {
    res.render('login')
  })

  app.get('/success', function (req, res) {
    res.render('signup-success')
  })

  app.get('/fail', function (req, res) {
    res.render('signup-fail')
  })

  app.get('/profile', function (req, res) {
    res.render('profile')
  })

  app.post("/publish", isAuthenticated, function (req, res) {
    if(req.body.message){
      io.sockets.emit("chat message", { username: req.user.fullName, message: req.body.message })
      res.send({})
    }
    else {
      res.status(400).json({message: 'No Message Received'})
    }
  })
}

function initDatabase() {
  db
    .sequelize
    .sync({ force: false })
    .then(function () {
      logger.info('You are connected to the database successfully.')
    })
}

export function init() {
  // Initialize Express middleware
  initMiddleware()

  // Initialize Passport
  initPassport()

  // Initialize modules server routes
  initRoutes(app)

  // Initialize db
  initDatabase()

  return server
}


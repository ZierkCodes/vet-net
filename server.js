import 'dotenv/config.js'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import createError from 'http-errors'
import session from 'express-session'
import logger from 'morgan'
import methodOverride from 'method-override'
import passport from 'passport'
import { passUserToView } from './middleware/middleware.js'


// import PubNub from 'pubnub'
// import ChatEngine from 'chat-engine'

// create the express app
const app = express()

// connect to MongoDB with mongoose
import('./config/database.js')

// load passport
import('./config/passport.js')

// require routes
import { router as indexRouter } from './routes/index.js'
import { router as authRouter } from './routes/auth.js'
import { router as profileRouter } from './routes/profile.js'
import { router as channelRouter } from './routes/channel.js'
import { router as channelsRouter } from './routes/channels.js'
import { router as userRouter } from './routes/user.js'
// import { router as channelRouter } from './routes/channel.js'
// import { router as reviewsRouter } from './routes/reviews.js'
// import { router as messagesRouter } from './routes/messages.js'

// view engine setup
app.set(
  'views',
  path.join(path.dirname(fileURLToPath(import.meta.url)), 'views')
)
app.set('view engine', 'ejs')

// middleware
app.use(methodOverride('_method'))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// app.use(
//   express.static(
//     path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')
//   )
// )
console.log(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public'))
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')))

// session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'lax',
    }
  })
)

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// custom middleware
app.use(passUserToView)

// PubNub
// const pubnub = new PubNub({
//   publishKey: process.env.PUBNUB_PUBLISH,
//   subscribeKey: process.env.PUBNUB_SUBSCRIBE
// })

// router middleware
app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/profile', profileRouter)
app.use('/user', userRouter)
app.use('/channel', channelRouter)
app.use('/channels', channelsRouter)
// app.use('/reviews', reviewsRouter)
// app.use('/messages', messagesRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export { app }
import express from 'express'
import session from 'express-session'
import path from 'path'
import favicon from 'serve-favicon'
import cookieParser from 'cookie-parser'
import hbs from 'hbs'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import createError from 'http-errors'

import routes from './routes/index.js'

class UserSettings {
  constructor(public orderBy: string = 'importance', public orderDirection: number = -1, public showFinished: boolean = false, public theme: string = 'light') {
  }
}

const sessionUserSettings = (req, res, next) => {
  const userSettings: UserSettings = req.session.userSettings || new UserSettings();
  const {orderBy, showFinished, theme} = req.query
  const ALLOWED_ORDERBY_VALUES: string [] = ['importance', 'createDate', 'finishDate']
  const ALLOWED_THEME_VALUES: string [] = ['light', 'dark']
  const ALLOWED_ORDER_DIRECTION_VALUES: number [] = [-1, 1]

  if (orderBy) {
    if (ALLOWED_ORDERBY_VALUES.includes(orderBy)) {
      userSettings.orderBy = orderBy
    }
    if (ALLOWED_ORDER_DIRECTION_VALUES.includes(userSettings.orderDirection)) {
      userSettings.orderDirection = userSettings.orderBy === orderBy ? userSettings.orderDirection * -1 : -1
    }
  }
  if (showFinished) {
    userSettings.showFinished = 'true' === showFinished
  }
  if (theme && ALLOWED_THEME_VALUES.includes(theme)) {
    userSettings.theme = theme
  }
  req.userSettings = req.session.userSettings = userSettings

  next()
}

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(session({
  secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda',
  resave: false,
  saveUninitialized: true
}))
app.use(sessionUserSettings)

// view engine setup
app.set('views', path.join(path.resolve(), 'views'))
app.set('view engine', 'hbs')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(path.resolve(), 'public', 'favicon.png')))
app.use(express.static(path.join(path.resolve(), 'public')))

hbs.registerHelper('times', function (n, block) {
  let accum = ''
  for (let i = 0; i < n; ++i) {
    accum += block.fn(i)
  }
  return accum
})

hbs.registerHelper('formatDate', function (datetime) {
  return new Date(datetime).toISOString().substring(0, 10)
})

hbs.registerHelper('ifEquals', function (v1, v2, options) {
  if (v1 === v2) {
    // @ts-ignore
    return options.fn(this)
  }
  // @ts-ignore
  return options.inverse(this)
})

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method
    delete req.body._method
    return method
  }
}))

app.use('/', routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handlers
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;

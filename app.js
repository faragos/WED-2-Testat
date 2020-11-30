import express from 'express';
import session from 'express-session';
import path from 'path';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import hbs from 'express-hbs';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import createError from 'http-errors';
import routes from './routes/index.js';
import { registerHelpers } from "./utils/handlebarsHelper.js";
import { sessionUserSettings } from "./middleware/usersettings.js";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda',
    resave: false,
    saveUninitialized: true
}));
app.use(sessionUserSettings);
// view engine setup
app.engine('hbs', hbs.express4({ defaultLayout: 'views/layout.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.resolve('views'));
// uncomment after placing your favicon in /public
app.use(favicon(path.join(path.resolve(), 'public', 'favicon.png')));
app.use(express.static(path.join(path.resolve(), 'public')));
registerHelpers(hbs);
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
app.use('/', routes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
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

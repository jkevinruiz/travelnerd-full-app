const mongoose = require('mongoose');
const cors = require('cors');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require("connect-flash");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// create connection to database
require('./config/dataConnector.js').connect();

//create express app
const app = express();

/* --- middleware section --- */
app.use(cors());

// server front end
app.use(express.static('client'));
app.use(express.static(path.join(__dirname, 'client/build')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: '5ced3db2-8ac6-46a3-a6de-cc0b7df13f6d', // random string
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session()); // calls serializeUser and deserializeUser in config/auth

require("./config/auth");

// app.use('/', indexRouter);

// use route handler for users
app.use('/users', usersRouter);

//use route handlers for API
const apiRoutes = require('./routes/apiRouter.js');
app.use('/api', apiRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

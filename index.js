// require('dotenv').config({
//     path:'./.env'
//   });
  const express = require('express');
  const path = require('path');
  const logger = require('morgan');
  const cookieParser = require('cookie-parser');
  const bodyParser = require('body-parser');
  const flash = require('connect-flash');
  const session= require('express-session')
  const passport= require('passport')

  const app = express();


  //Db config and mongo connection
  require('./app_api/models/db');
  //require('./app_api/config/passport')(passport)
  
  
  //routes
  const apiRoutes = require('./app_api/routes/index');
  

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  //Express session
  app.use(session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
  }))

  //passport middleware
  app.use(passport.initialize);
  app.use(passport.session);

  //Connect-flash
  app.use(flash()) 

  //Global variables
  app.use(function( req, res, next) {
    // set locals, only providing error in development
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('success_msg');
  
  });
  
  
  
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  
  
  app.use('/', apiRoutes);
  
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  });
  
  module.exports = app;
  


var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var multer = require('multer');
// var storage = multer.memoryStorage()
// var upload = multer({ storage: storage })
//var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var serviceRouter = require('./routes/service');
const serverless = require('serverless-http');
var app = express();
var cors = require('cors');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.options('*', cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

// To parse Form Data
//app.use(upload.array()); 

// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/test', indexRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/service', serviceRouter);
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Final Router
module.exports.handler = serverless(app);
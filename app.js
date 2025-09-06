var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http')
require('dotenv').config();
const{connecttoMongoDB} = require("./config/db")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter');
var osRouter = require('./routes/osRouter');
const reservationroute = require('./routes/reservationroute');



var app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/os', osRouter);
const abonnementroute = require('./routes/abonnementroute');
app.use('/api/abonnements', abonnementroute);
const programmeroute = require('./routes/programmeroute');
app.use('/api/programme', programmeroute);
app.use('/api/reservation', reservationroute);
app.get('/', (req, res) => {
  res.send('Serveur OK');
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

const server = http.createServer(app);
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`App is running on port ${port}`)
  connecttoMongoDB()
})

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var MoicapnhatRouter = require('./routes/MoiCapNhat');
var TruyenRouter = require('./routes/Truyen');
var ChuongRouter = require('./routes/Chuong');
var TruyenHotRouter = require('./routes/TruyenHot');
var TruyenMoiDangRouter = require('./routes/MoiDang');
var TruyenFullRouter = require('./routes/TruyenFull');
var TheloaiRouter = require('./routes/Theloai');
var ListTheloaiRouter = require('./routes/ListTheLoai');
var TacGiaRouter = require('./routes/TacGia');
var TimKiemRouter = require('./routes/TimKiem');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/update', MoicapnhatRouter);
app.use('/truyen', TruyenRouter);
app.use('/chuong', ChuongRouter);
app.use('/truyenhot', TruyenHotRouter);
app.use('/moidang', TruyenMoiDangRouter);
app.use('/truyenfull', TruyenFullRouter);
app.use('/theloai', TheloaiRouter);
app.use('/gettheloai', ListTheloaiRouter);
app.use('/tacgia', TacGiaRouter);
app.use('/timkiem', TimKiemRouter);

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

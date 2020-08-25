require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const app = express();

// require database configuration
require('./configs/db.config');

// require sessions
require('./configs/session.config')(app);

// Middleware Setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

<<<<<<< HEAD

app.set('views', path.join(__dirname,'public/views'));
=======
app.set('views', path.join(__dirname, '/public/views'));
>>>>>>> 2b4a48aba60be9fcd3af315b7252f9ba617f17d8
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'PLANR APP - Project M2 - Ironhack';

// const index = require('./routes/index');
// app.use('/', index);
//      |  |  |
//      V  V  V
app.use('/', require('./routes/index.routes'));
app.use('/auth', require('./routes/auth.routes'));
<<<<<<< HEAD
//app.use('/', require('./routes/cities.routes'));
app.use('/', require('./routes/events.routes'));
=======
// app.use('/cities', require('./routes/cities.routes'));
// app.use('/events', require('./routes/events.routes'));
>>>>>>> 2b4a48aba60be9fcd3af315b7252f9ba617f17d8

module.exports = app;

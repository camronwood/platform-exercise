// Load dependicies
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');

// Load env
require('custom-env').env(true, './config');

// Load body-parser middleware
const bodyParser = require('body-parser');

// Load express framwork
const express = require('express');

// Load the router
const router = express.Router();

// Create the express app instance
const app = express();

// Add middleware for inbound JSON post requests
app.use(express.json());

// Add body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add cookie-parser middleware
app.use(cookieParser());

// Add request loggin middlware
app.use(morgan('dev'));

app.use(session({
  key: 'user_sid',
  secret: 'thisisafakesecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000,
  },
}));

// Load the routes
const routes = require('./routes');
const catchAllRoutes = require('./routes.catchall');

// Set the routes
routes(router);
catchAllRoutes(router);

// verseion the router
app.use('/v1', router);

module.exports = app;

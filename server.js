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
app.use(bodyParser.urlencoded({
    extended: true
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

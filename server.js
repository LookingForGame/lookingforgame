var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var config = require('./config')
var port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE);

// Create separate routers for api and auth
var apiRouter = express.Router();
var authRouter = express.Router();

// Routes for API Router
require('./routes/users-routes')(apiRouter);
require('./routes/instance-routes')(apiRouter);
require('./routes/locations-routes')(apiRouter);
require('./routes/games-routes')(apiRouter);

// Routes for Auth Router
require('./routes/auth-routes')(authRouter);

// Prefix Routes with /api or /auth
app.use('/api', apiRouter);
app.use('/auth', authRouter);

// Serve all static asset files from public directory
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/img", express.static(__dirname + "/public/img"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/views", express.static(__dirname + "/public/views"));
app.use("/templates", express.static(__dirname + "/public/templates"));


// Serve index.html for all remaining routes, in order to leave routing up to angular
app.all("/*", function(req, res, next) {
    res.sendfile("index.html", { root: __dirname + "/public" });
});

// Every 15 minutes run autoMarkComplete
setInterval(function() {
  require('./mongoUtil').autoMarkComplete();
}, 900000);

app.listen(port, function() {
  console.log('Server listening on ' + port);
});

module.exports = app;

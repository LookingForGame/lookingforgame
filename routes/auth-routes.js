var User = require('../models/User');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

module.exports = function(router) {

  router.use(bodyParser.json());

  // Login
  router.post('/login', function(req, res) {

    // Force username to lowercase
    req.body.username = req.body.username.toLowerCase();

    // Find a user
    User.findOne({username: req.body.username}, function(err, user) {
      if (err) {
        res.status(500).json({success: false, msg: 'Server Error'});
      } else {
        if (!user) {
          res.json({success: false, msg: 'Invalid username'});
        } else if (!user.verifyPassword(req.body.password)) {
          res.json({success: false, msg: 'Invalid password'});
        } else {
          var token = jwt.sign(user, process.env.SECRET, {expiresInMinutes: process.env.EXPIRES});
          res.json({success: true, msg: 'Authentication successfull', token: token});
        }
      }
    });
  });

};

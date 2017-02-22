var mongoose = require('mongoose');
var Instance = require(__dirname + '/../../models/Instance.js');
var User = require(__dirname + '/../../models/User.js');

module.exports = {

  get: function(req, res) {
    Instance.find({}).populate('participants').exec(function(err, instances) {
      if (err) {
        res.status(500).json({
          success: false,
          msg: 'Error finding instances',
          error: err
        });
      } else {
        console.log('This is the decoded ID: ' + req.decoded._id);
        User.findOne({_id: req.decoded._id}, function(err, data) {
          console.log('This is the data: ' + data);
          console.log('This is the error: ' + err);
          if (err) {
            res.status(500).json({success: false, msg: 'Error finding user', error: err});
          } else {
            res.json({success: true, msg: 'Get all instances successful', data: instances, userId: req.decoded._id, isCommitted: data.isCommitted, hosting: data.hosting, userName: data.username});
          }
        });
      }
    });
  },

  post: function(req, res) {
    User.findOne({
      _id: req.decoded._id
    }, function(err, data) {
      if (err) {
        res.status(500).json({
          success: false,
          msg: 'Error finding instances',
          error: err
        });
      } else {
        if (data.isCommitted === false) {
          var instance = new Instance(req.body);
          instance.creator = req.decoded._id;
          User.findOneAndUpdate({
            _id: req.decoded._id
          }, {
            hosting: true,
            isCommitted: true
          }, function(err, numchanged) {
            if (err) {
              return res.status(500).json({
                success: false,
                msg: 'Error finding host user',
                error: err
              });
            }
          });
          instance.save(function(err, data) {
            if (err) {
              res.status(500).json({
                success: false,
                msg: 'Error saving instance',
                error: err
              });
            } else {
              res.json({
                success: true,
                msg: 'Instance created successfully',
                data: data
              });
            }
          });
        } else {
          res.status(403).json({
            msg: 'User isCommitted to another game'
          });
        }
      }
    });
  },

  autoMarkComplete: function() {
    // Check for instances that were created more than 24 hours ago.
    var yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
    // i.e. "less than yesterday"
    Instance.update({date: {$lt: yesterday}, gameOver: false},
    {gameOver: true}, {multi: true}, function(err, numAffected) {
      if (err) {
        console.log({success: false, msg: 'Error updating instances', error: err});
      } else {
        console.log({success: true, msg: 'Successfully set gameOver to true', data: numAffected});
      }
    });
  }


};

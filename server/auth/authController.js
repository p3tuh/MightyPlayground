var Auth = require('../../db/models/user.js');
var Q = require('q');
var passport = require('./facebookSignin.js');

module.exports = {

  find: function(req, res) {
    var findUser = Q.nbind(User.findOne, User);

    findUser({facebookid: req.body.facebookid})   //facebook ID for signin
    .then(function(foundUser) {
      if (foundUser) {
        res.status(200).send('User found, redirecting to stream!');
      }
      if (foundUser === null) {
        var newUser = {
          facebookid: req.body.facebookid
          //add first name
          //add last name
        };
        newUser.save();
        res.status(404).send('Facebookid not found. User saved, now redirect to phone number');
      }
    })
    .catch(function(err) {
      console.log(err);
    });
  },

  savePhoneNumber: function(req, res) {
    var updateUser = Q.nbind(User.update, User);

    updateUser({facebookid: req.body.facebookid})
    .then(function(foundUser) {
      if (foundUser) {
        foundUser._id = req.body.phoneNumber;
        foundUser.save();
      }
    })
    .then(function() {
      res.status(200).send('User found, redirecting to phone number');  
    });
  },

  delete: function(req, res) {
    var findUser = Q.nbind(User.findOne, User);
    
    findUser({facebookid: req.body.facebookid})
    .then(function(foundUser) {
      if (foundUser) {
        foundUser.remove();
        res.status(200).send('User deleted!');  //redirect to facebook login screen
      }
    });
  },

  authenticate: function() {
    passport.authenticate('facebook'), 
      function(req,res) {
      };
    console.log('facebook');
  },

  loginUser: function(){ 
    console.log('loginUser');
    passport.authenticate('facebook', { successRedirect: '/messages',
                                          failureRedirect: '/login' });
  }
  
};






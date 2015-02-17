var Users = require('../db/models/user.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').FacebookStrategy;

module.exports = {

  passport.serializeUser(function(user, done) {  
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {  
    done(null, obj);
  });

  passport.use(new FacebookStrategy({  
    clientID: ('427819184047831'),
    clientSecret: ('9e2d0ca80f9159df996590fd917f8474'),
    callbackURL: "http://localhost:3000/auth/facebook/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    console.dir(profile);
    var profileIdString = profile.id.toString();


};
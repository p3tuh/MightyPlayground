var Users = require('../../db/models/user.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

//serialize and deserialize are used for sessions
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//move clientID and secret as to not expose credentials
passport.use(new FacebookStrategy({
    clientID: '427819184047831',
    clientSecret: '9e2d0ca80f9159df996590fd917f8474',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
  },
  function(accessToken, refreshToken, profile, done) {


    process.nextTick(function () { 
      // Users.findOne({where: { facebookId: profileIdString }})
      // .then(function(user) {
      //   if (user) {
      //     done(null, profile);    
      //   } else {
      //     Users.create({ 
      //       username: profile.name.givenName + profile.name.familyName,
      //       facebookId: profile.id
      //     });
      //     done(null, profile);
      //   }
      // });
    return done(null, profile);
    });
  }
));

module.exports = passport;
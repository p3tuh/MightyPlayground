var morgan = require('morgan'); // used for logging incoming request
var bodyParser = require('body-parser');
var helpers = require('./helpers.js'); // our custom middleware
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: 427819184047831,
    clientSecret: '9e2d0ca80f9159df996590fd917f8474',
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
  
));


module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  var authRouter = express.Router();
  // var userRouter = express.Router();
  var messageRouter = express.Router();
  var clientRouter = express.Router();

  app.use(morgan('dev')); 
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../www'));


  // app.use('/auth', authRouter); // use user router for all auth request
  // app.use('/users', userRouter); // use user router for all user request
  app.use('/messages', messageRouter); // use message router for all message requests
  app.use('/clients', clientRouter); // use client router for all client request


  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject our routers into their respective route files
  // require('./auth/authRoutes.js')(authRouter);
  // require('./users/userRoutes.js')(userRouter);
  require('./messages/messageRoutes.js')(messageRouter);
  require('./clients/clientRoutes.js')(clientRouter);


  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { successRedirect: '/tab/messages', failureRedirect: '/login' }));


};



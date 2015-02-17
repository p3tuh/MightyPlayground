var authController = require('./authController.js');
var passport = require('./facebookSignin.js');

module.exports = function (app) {

  app.post('/', authController.find); 
  app.delete('/', authController.delete);
  app.post('/phone', authController.savePhoneNumber);
  app.get('/facebook', authController.authenticate);
  app.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
};

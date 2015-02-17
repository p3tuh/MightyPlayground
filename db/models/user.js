var mongoose = require('mongoose');
var Message = require('./messages');

var usersSchema = new mongoose.Schema({
  _id: {type: Number, min: 9, max: 9}, //phone number
  facebookid: {type: String}
  // messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
});


// usersSchema.pre('save', function(next) {
//   this.hashPassword(next);
//   console.log(this.password);
// });


var User = mongoose.model('User', usersSchema);
module.exports = User;

// var newUser = new User({username: 'a', password: '123', salt: 'salt'});
// newUser.save(function(err, user) {
//   if (err) { console.log(err); }
//     else { console.log('saved!'); }

// });
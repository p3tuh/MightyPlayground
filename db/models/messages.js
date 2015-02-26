var mongoose = require('mongoose');

var User = require('./user');

var messagesSchema = new mongoose.Schema({
  _id: Number,
  photo_url: String,
  _creator: String,
  created_at: { type: Date },
  // recipient: [{type: Number, ref: 'User'}],
  location : {
    type: { 
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  },
  message: String,
  votes: { type: Number, default: 0 },
  isPrivate: Boolean,
  recipients: []
});

messagesSchema.index({ location : '2dsphere' });

var Message = mongoose.model('Message', messagesSchema);

module.exports = Message;
var Message = require('../../db/models/messages.js');
var Q = require('q');
var AWS = require('aws-sdk');
AWS.config.region = 'us-west-1';

module.exports = {

  displayReplies: function(req, res) {

  },

  addMessageDetail: function (req, res) {
    var toAdd = req.body[0];
    var messageID = req.body[1];
    var addMessage = Q.nbind(Message.findByIdAndUpdate, Message);
    addMessage(messageID, { $push : { messageDetail: toAdd }}, {safe: true, upsert: true},
    function(err, model) {
        console.log(err);
    });
    //console.log(toAdd);//log out the array
    //console.log($push);
  },

  updateVote: function(req, res) {
    var voteCount = req.body[1];
    var messageID = req.body[0];
    console.log('Received updated voteCount from client, where votes = ', voteCount);
    var updateVote = Q.nbind(Message.findByIdAndUpdate, Message);
    updateVote(messageID, { votes : voteCount} );
  },

  queryByLocation: function(lat, long, radius) {
    var query = {};
    query.location = {
      $near : {
        $geometry : {
          type : "Point",
          coordinates : [long, lat] 
        },
        $maxDistance : radius
      }
    };
    return query;
    
    findAround(query, function(err, result){
      console.log('Sent messages within 100m of (' + req.body[0].long + ", " + req.body[0].lat + ') to client. Here are the messages:' + result);
      res.sendStatus(result);
    });
  },

  computeSortString: function(sortType) {
    sortType = sortType || '-created_at';
    if (sortType === 'new') {
      sortType = '-created_at';
    } else if (sortType === 'top') {
      sortType = '-votes';
    }
    return sortType;
  },

  getNearbyMessages: function(req, res) {
    var sortString = module.exports.computeSortString(req.body[1]);//pass in 'new' or 'top'
    var locationQuery = module.exports.queryByLocation(req.body[0].lat, req.body[0].long, 100);

    Message
      .find(locationQuery)
      .limit(50) 
      .sort(sortString)
      .exec(function (err, messages) {
        // console.log('Sent messages within 100m of (' + req.body[0].lat + ", " + req.body[0].long + ') to client. Here are the messages:' + messages);
        res.send(messages);
    });
  },

  saveMessage: function (req, res) {
    // console.log('saveMesage! req.body: ' + JSON.stringify(req.body));
    var createMessage = Q.nbind(Message.create, Message);
    console.log(req.body);
    var data = { //TODO: add a facebookID field
      _id: Number(req.body.id), 
      location: {coordinates: [req.body.coordinates.long, req.body.coordinates.lat]},
      message: req.body.text,
      created_at: new Date(),
      photo_url: 'https://mpbucket-hr23.s3-us-west-1.amazonaws.com/' + req.body.id
    };
    console.log('typeof data id ' + typeof data._id);
    console.log('data id value ' + data._id);

    createMessage(data) 
      .then(function (createdMessage) {
        res.status(200).send('great work!');
        console.log('Message ' + data.message + ' was successfully saved to database', createdMessage);
      })
      .catch(function (error) {
        console.log(error);
      });
  },

<<<<<<< HEAD
  // saveImage: function(req, res) {}
    //TODO: figure out how to send photo from server
    
    // var creds = {
    //   bucket: 'mpbucket-hr23',
    //   access_key: 'AKIAJOCFMQLT2OTUDEJQ',
    //   secret_key: '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'
    // };

    // AWS.config.update({ accessKeyId: creds.access_key, secretAccessKey: creds.secret_key });
    // AWS.config.region = 'us-west-1';
    // var bucket = new AWS.S3({ params: {Bucket: creds.bucket } });
    // var params = { Key: req.body.name, ContentType: req.body.type, Body: JSON.stringify(req.body), ServerSideEncryption: 'AES256' };
    //   bucket.putObject(params, function(err, data) {
    //     if (err) {
    //       console.log('error uploading data: ', err.message);
    //     } else {
    //       console.log('Upload Done');
    //     }
    //   });
=======
  displayReplies: function (req, res) {
    //stuff
  },

  savePrivate: function(req, res) {
    var createMessage = Q.nbind(Message.create, Message);
    console.log('private message data: ' + JSON.stringify(req.body));

    createMessage(req.body) 
      .then(function (createdMessage) {
        console.log('Message ' + data.message + ' was successfully saved to database', createdMessage);
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  getPrivate: function(req, res) {
    console.log('server req.body: ' + JSON.stringify(req.body));
    var locationQuery = module.exports.queryByLocation(req.body.coordinates.lat, req.body.coordinates.long, 100);
    // { location: { '$near': { '$geometry': [Object], '$maxDistance': 100 } } }
    Message
      .find(locationQuery)
      .where(isPrivate).equals(true)
      .where(req.body.upserPhone)
      .in(recipients)
      // .sort()
      .exec(function(err, messages) {
        res.send(messages);
    });

  }
>>>>>>> 23747eb2e50dabdf9dfc9705e117c6be9125e073
};
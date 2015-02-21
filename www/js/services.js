var base = 'https://mightyplayground.heroku.com';

angular.module('thoughtdrop.services', [])

.factory('Messages', function($http, $cordovaGeolocation) {

  var getMessages = function() {
    return $http({
      method: 'GET',
      url: '/api/messages/'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var findNearby = function() {
    var sendPosition = function(data) {
      return $http({
        method: 'POST',
        url: base + '/api/messages/nearby',
        data: JSON.stringify(data)
      })
      .then(function (resp) {
        console.log('Server resp to func call to findNearby', resp);  
        $scope.$broadcast('scroll.refreshComplete');
        return resp.data;
      });
    };
    
    $cordovaGeolocation
    .getCurrentPosition()
    .then(function(position) {
      var coordinates = {};
      coordinates.lat = position.coords.latitude;
      coordinates.long = position.coords.longitude;
      sendPosition(coordinates);
    });
  };

  return {
    getMessages: getMessages,
    findNearby: findNearby
  };
})

.factory('Facebook', function($http){

  var storeId = function(data) {
    console.log(data);
    return $http({
      method: 'POST',
      url: base + '/api/auth/id',
      data: data
    })
    .then(function(resp) {
      console.log("user id stored", resp);
    });
  };

  var updatePhone = function(data) {
    console.log(data);
    return $http({
      method: 'POST',
      url: base + '/api/auth/phone',
      data: data
    })
    .then (function(resp) {
      console.log('userPhone is stored', resp);
    });
  };

  return {
    storeId: storeId,
    updatePhone: updatePhone
  };
});
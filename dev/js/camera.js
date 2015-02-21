angular.module('thoughtdrop.camera', [])

.controller('cameraController', function($scope, Camera, $cordovaFile) {
    
    $scope.images = [];

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
      $scope.lastPhoto = imageURI;
    });
  };
    // , function(err) {
    //   console.err(err);
    // }, 
    //   quality: 75,
    //   targetWidth: 320,
    //   targetHeight: 320,
    //   saveToPhotoAlbum: false
    // });

});


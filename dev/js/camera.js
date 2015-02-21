angular.module('thoughtdrop.camera', [])

.controller('cameraController', function($scope, $cordovaCamera, $cordovaFile) {
  $scope.images = [];

  $scope.urlForImage = function(imageName) {
    var name = imageName.substr(imageName.lastIndexOf('/') + 1);
    var trueOrigin = cordova.file.dataDirectory + name;
    return trueOrigin;
  };
  
  $scope.addImage = function() {
    // 2. The options array is passed to the cordovaCamera with specific options. 
    // For more options see the official docs for cordova camera.
    var options = {
        destinationType : Camera.DestinationType.FILE_URI,
        sourceType : Camera.PictureSourceType.PHOTOLIBRARY, // Camera.PictureSourceType.PHOTOLIBRARY  .CAMERA    .SAVEDPHOTOALBUM
        allowEdit : true,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        correctOrientation: true
    };
       
  // 3. Call the ngCodrova module cordovaCamera we injected to our controller
    $cordovaCamera.getPicture(options).then(function(imageData) {

      console.log(imageData);

        // 4. When the image capture returns data, we pass the information to our success function, 
        // which will call some other functions to copy the original image to our app folder.
        onImageSuccess(imageData);

        function onImageSuccess(fileURI) {
            createFileEntry(fileURI);
        }

        function createFileEntry(fileURI) {
            window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
        }

        // 5. This function copies the original file to our app directory. As we might have to deal 
        // with duplicate images, we give a new name to the file consisting of a random string and the original name of the image.
        function copyFile(fileEntry) {
            var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
            var newName = makeid() + name;

            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
                fileEntry.copyTo(
                    fileSystem2,
                    newName,
                    onCopySuccess,
                    fail
                );
            },
            fail);
          }
       
        // 6. If the copy task finishes successful, we push the image url to our scope array of images. 
        //Make sure to use the apply() function to update the scope and view!
        function onCopySuccess(entry) {
            $scope.$apply(function () {
                $scope.images.push(entry.nativeURL);
            });
        }

        function fail(error) {
            console.log("fail: " + error.code);
        }

        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i=0; i < 5; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }
        
  }, function(err) {
      console.log(err);
  };
});


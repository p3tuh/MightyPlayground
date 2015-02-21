angular.module('thoughtdrop.contacts', [])

.controller('contactsController', function($scope, $cordovaContacts, $cordovaFile) {
  $scope.contacts = {};
  
   $scope.getContactList = function() {
        $cordovaContacts.find({filter: '', multiple:true}).then(function(result) {
          console.log(result);
            $scope.contacts = result;
        }, function(error) {
            console.log('ERROR: ' + error);
        });
    };
});


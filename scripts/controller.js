angular.module('twitterscore')
.controller('profileController', function($scope, scoreService, $stateParams){
  var handle = $stateParams.handle;
  $scope.handle = handle;
  $scope.handle_input = handle;
  scoreService.getProfileInfo(handle).then(function(data){
    $scope.profileInfo = data;
  });
});

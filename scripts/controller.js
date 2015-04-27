angular.module('twitterscore')
.controller('profileController', function($scope, scoreService, $stateParams){
  var handle = $stateParams.handle;
  scoreService.getProfileInfo(handle).then(function(data){
    $scope.profileInfo = data;
  });
  scoreService.getRecentTweets(handle).then(function(data){
    $scope.tweets = data;
  });
  scoreService.getReputationScore(handle).then(function(data){
    $scope.profileInfo.score = data;
  });
  $scope.handle_input = handle;
});

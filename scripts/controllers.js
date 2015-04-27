angular.module('twitterscore')
.controller('profileController', function($scope, scoreService, $stateParams){
  var handle = $stateParams.handle;
  scoreService.getProfileInfo(handle)
  .then(function(data){
    $scope.profileInfo = data;
    scoreService.getRecentTweets(handle).then(function(data){
      $scope.tweets = data;
    });
    scoreService.getReputationScore(handle).then(function(data){
      $scope.reputation_score = data;
    });
  })
  .catch(function(err){
    $scope.error = { text: err.statusText };
  });
  $scope.handle_input = handle;
});

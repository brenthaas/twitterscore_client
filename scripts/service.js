angular.module('twitterscore')
.factory('scoreService', function($http){
  var scoreUrl = 'http://twitterscore.herokuapp.com/users/';

  return {
    getProfileInfo: function(handle){
      return $http.get(scoreUrl + handle + "/profile").then(
        function(data){
          var resp = data.data;
          var signupDate = new Date(resp.created_at)
          return {
            name: resp.name,
            handle: resp.screen_name,
            location: resp.location,
            signupYear: signupDate.getFullYear(),
            following: resp.friends_count,
            followers: resp.followers_count
          }
        }, function(err){
          console.log('We have an error',err);
          return {
            error: "Error contacting server\n" + err
          }
        }
      );
    }
  }
});

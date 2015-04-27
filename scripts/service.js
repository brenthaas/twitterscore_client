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
            error: "Error getting profile\n" + err
          }
        }
      );
    },

    getRecentTweets: function(handle){
      return $http.get(scoreUrl + handle + "/recent_tweets").then(
        function(data){
          var resp = data.data;
          var tweets = [];
          for (var i=0; i < resp.length; i++) {
            tweet = resp[i];
            tweets.push({
              text: tweet.text,
              created_at: tweet.created_at,
              retweet_count: tweet.retweet_count
            });
          }
          return tweets
        }, function(err){
          console.log('We have an error',err);
          return {
            error: "Error getting profile\n" + err
          }
        }
      );
    },

    getReputationScore: function(handle){
      return $http.get(scoreUrl + handle + "/score").then(
        function(data){
          return data.data.reputation_score
        }, function(err){
          console.log('We have an error',err);
          return {
            error: "Error getting profile\n" + err
          }
        }
      );
    }
  }
});

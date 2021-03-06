angular.module('twitterscore')
.factory('scoreService', function($http){
  var scoreUrl = location.origin.match(/localhost/) ? 'http://localhost:3000/users/' : 'http://twitterscore.herokuapp.com/users/';

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
            create_date = new Date(tweet.created_at);
            tweets.push({
              text: tweet.text,
              created_at: create_date.toString(),
              media_urls: tweet.media_urls,
              timestamp: create_date.getTime(),
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

angular.module('twitterscore', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('userProfile',{
      url: '/profile/:handle',
      templateUrl: 'views/user_profile.html',
      controller: 'profileController'
    })
});

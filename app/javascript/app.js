'use strict';

var muse = angular.module('muse', [
  'services',
  'ui.router'
]);

muse.config(function($stateProvider){
  $stateProvider
    .state("query", {
      url: '/',
      templateUrl: 'app/html/query-form.html',
      controller: 'QueryController'
    })
    .state("playlist", {
      url: '/playlist',
      templateUrl: 'app/html/playlist.html',
      controller: 'PlaylistController'
    });
});

muse.controller("QueryController", function($scope,$http, $state, EchonestFactory) {
//USE songs/artist suggest for error handling

//Search for songs based on query
  $scope.search = function(artist,title){
    EchonestFactory.search(artist,title);
    $state.go('playlist');
  }

});



muse.controller("PlaylistController", function($scope,$http, PlaylistFactory) {
  // var playlist;

  $scope.search = function(artist, danceability, energy){
    PlaylistFactory.search(artist, danceability, energy);
  };

});



muse.controller("YoutubeController", function($scope,$http, Youtube) {



});


// create a playlist
  // based on:
    // genre
    // specicied audio_buckets (danceability)


// max_danceability  no  no  0.0 < danceability < 1.0  the maximum danceability of any song
// min_danceability  no  no  0.0 < danceability < 1.0  the minimum danceability of any song

//EXPERIMENTAL SPEECH QUERY
// Generates a 20 song playlist of popular music from the 70s sorted by increasing tempo
// http://developer.echonest.com/api/v4/playlist/static?api_key=CNQ7EJLGCHNW8QOIT&description=70s&description=disco&type=artist-description&artist_min_familiarity=.7&sort=tempo-asc&results=20

'use strict';

var muse = angular.module('muse', [
  'services',
  'ui.router'
]);

muse.config(function($stateProvider){
  $stateProvider
    .state("query", {
      url: '/query',
      templateUrl: 'app/html/query-form.html',
      controller: 'QueryController'
    });
});

muse.controller("QueryController", function($scope,$http, EchonestFactory) {
//USE songs/artist suggest for error handling
//Search for songs based on query
  $scope.search = function(artist,title){
    EchonestFactory.search(artist,title);
  }
});


muse.controller("PlaylistController", function($scope,$http, EchonestFactory) {
  // var playlist;

  $scope.search = function(artist, danceability, energy){
    var queryURL = 'http://developer.echonest.com/api/v4/playlist/static?api_key=' + echonestApiKey;
    if(artist){
      queryURL += '&artist=' + artist;
    }
    if(danceability){
      queryURL += '&max_danceability=' + danceability;
    }
    if(energy){
      queryURL += '&max_energy=' + energy;
    }
    queryURL += '&format=json&results=5&type=artist-radio';
    console.log("queryURL", queryURL);
    // $http.get('http://developer.echonest.com/api/v4/playlist/static?api_key=' + echonestApiKey + '&artist=' + artist.name + '&format=json&results=5&type=artist')
    $http.get(queryURL)
    .success(function(data, status, headers, config) {
      $scope.playlist = data;
      console.log(data);
    })
    .error(function(data, status, headers, config) {
      console.log('error');
    });
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

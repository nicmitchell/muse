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

muse.controller("QueryController", function($scope,$http, $q, EchonestFactory) {
//USE songs/artist suggest for error handling
//Search for songs based on query
  $scope.search = function(artist,title){
    EchonestFactory.search(artist,title);
  }

   // var defer = $q.defer();

   //  defer.promise.then(function () {
   //    console.log(EchonestFactory.results.audio_summary.audio_summary.danceability);
   //    $scope.danceability = EchonestFactory.results.audio_summary.audio_summary.danceability;
   //    $scope.energy = EchonestFactory.results.audio_summary.audio_summary.energy;
   //    $scope.instrumentalness = EchonestFactory.results.audio_summary.audio_summary.instrumentalness;
   //    $scope.liveness = EchonestFactory.results.audio_summary.audio_summary.liveness;
   //    $scope.speachiness = EchonestFactory.results.audio_summary.audio_summary.speachiness;
   //    $scope.initial = EchonestFactory.results.songs[0];
   //  });

   //  defer.resolve();
});


muse.controller("PlaylistController", function($scope,$http, PlaylistFactory, EchonestFactory) {

  $scope.search = function(artist, danceability, energy){
      var playlist = PlaylistFactory.search(EchonestFactory.results.artist_summary.name, danceability, energy);
      $scope.playlist = PlaylistFactory.results;
      // console.log('PLAYLIST RESULTS', $scope.playlist);
    };

});



muse.controller("YoutubeController", function($scope,$http, YoutubeFactory, EchonestFactory) {


  $scope.youtubeSearch = function(artist, title){
    console.log(EchonestFactory.results);
    YoutubeFactory.search(artist, title);
    // YoutubeFactory.search(EchonestFactory.results.songs[0].artist_name, EchonestFactory.results.songs[0].title);
    console.log('YOUTUBE CONTROLLER', YoutubeFactory);
    // $scope.initialDanceability = PlaylistFactory.search($scope.selectedArtist, danceability, energy)[0]
  };

  $scope.vidId = YoutubeFactory.results.vidId;
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

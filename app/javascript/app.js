'use strict';

var muse = angular.module('muse', [
  // 'services',
  'angular-echonest'
]);

var apiKey = 'CNQ7EJLGCHNW8QOIT';
muse.config(['EchonestProvider', function(EchonestProvider) {
  EchonestProvider.setApiKey(apiKey);
}]);

muse.controller("QueryController", function($scope,$http,Echonest) {

//USE songs/artist suggest for error handling

//Search for songs based on query
  $scope.search = function(artist, title){

    //set up variables
    // $scope.artist,
    // $scope.audio_summary,
    // $scope.songs
    // $scope.data.artist =
    // $scope.artist_summary = artist name
    var results = {};

    Echonest.songs.search({
      artist: artist || null,
      title: title || null,
      //return songs
    }).then(function(songs) {
      results.songs = songs;
      console.log('SONG RESULT', $scope.songs);

      //get artist info on top result
      Echonest.artists.get({
        id: songs[0].artist_id,
        bucket: 'terms'
      }).then(function(artist) {
        $scope.artist_summary = artist;
        console.log('ARTIST SUMMARY', $scope.artist_summary);
      })

      //get audio summary on top result
      Echonest.songs.get({
        id: songs[0].id,
        bucket: 'audio_summary'
      }).then(function(audio_summary) {
        $scope.audio_summary = audio_summary;
        console.log('AUDIO SUMMARY', $scope.audio_summary);
      })
      return results;
    });
  }
});


muse.controller("PlaylistController", function($scope,$http,Echonest,QueryController) {
        
        console.log('SONGS IN PLAYLIST',QueryController.songs);

        $http.get('http://developer.echonest.com/api/v4/playlist/static?api_key=' + apiKey + '&artist=' + artist.name + '&format=json&results=10&type=artist').success(function(data, status, headers, config) {
          playlist = data;
        })
        .error(function(data, status, headers, config) {
          console.log('error');
        });

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

var services = angular.module('services', ['angular-echonest'])

var echonestApiKey = 'CNQ7EJLGCHNW8QOIT';

services.config(['EchonestProvider', function(EchonestProvider) {
  EchonestProvider.setApiKey(echonestApiKey);
}]);

services.factory('EchonestFactory', function ($http, Echonest) {

  var results = {};
  var search = function(artist, title){
    Echonest.songs.search({
      artist: artist || null,
      title: title || null,
      //return songs
    }).then(function(songs) {
      results.songs = songs;
      console.log('SONG RESULT', songs);

      //get artist info on top result
      Echonest.artists.get({
        id: songs[0].artist_id,
        bucket: 'terms'
      }).then(function(artist_summary) {
        results.artist_summary = artist_summary;
        console.log('ARTIST SUMMARY', artist_summary);
        return results;
      })

      //get audio summary on top result
      Echonest.songs.get({
        id: songs[0].id,
        bucket: 'audio_summary'
      }).then(function(audio_summary) {
        results.audio_summary = audio_summary;
        console.log('AUDIO SUMMARY', audio_summary);
        return results;
      })
      return results;
    });
  };

  return {
    search: search,
    results: results
  };

});

services.factory('PlaylistFactory', function($http){
  var results = {};
  var search = function(artist, danceability, energy){
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
    queryURL += '&format=json&results=5&type=artist-radio&bucket=audio_summary';

    $http.get(queryURL)
    .success(function(data, status, headers, config) {
      console.log(data);
      results.playlist = data;
      return data;
    })
    .error(function(data, status, headers, config) {
      console.log('error');
    });
    // return results;
  };

  return {
    search: search,
    results: results
  };
});


services.factory('YoutubeFactory', function ($http) {

    var search = function(artist, title){
      var youtubeApiKey = 'AIzaSyD8M6zcr3cPZlLL1XmBnRWBUlblNEYzMBo';

      //Query for youtube results based on echonest selected song
      var dataurl ='http://gdata.youtube.com/feeds/api/videos?q=' + Echonest.search.songs[0].title + '%20' + Echonest.search.songs[0]._____ + '&orderby=rating&alt=json';

        $http.get(dataurl).success(function(data){
            return  data.feed.entry;
        });

      //Return media for irst result of query
      // $http.get('http://developer.echonest.com/api/v4/playlist/static?api_key=' + echonestApiKey + '&artist=' + artist.name + '&format=json&results=5&type=artist').success(function(data, status, headers, config) {
      //   playlist = data;
      // })
      // .error(function(data, status, headers, config) {
      //   console.log('error');
      // });
    }

  return {
    search: search
  }
});

'use strict';

var muse = angular.module('muse', [
  'services',
  'angular-echonest'
]);

muse.config(['EchonestProvider', function(EchonestProvider) {
  EchonestProvider.setApiKey('CNQ7EJLGCHNW8QOIT');
}]);


Echonest.songs.search({
  artist: 'radiohead',
  title: 'karma police'
}).then(function(songs) {
  console.log(songs); // -> [{artist_id: "ARH6W4X1187B99274F", artist_name: "Radiohead", id: "SOHJOLH12A6310DFE5", title: "Karma Police"}, {...}]
});






angular.module('services', [])

.factory('Ech', function ($http) {

   //FIREBASE HOOKUP
        // var ref = new Firebase("https://hackathon-app.firebaseio.com/data");
        // var sync = $firebase(ref);
        // // create a synchronized array for use in our HTML code
        // scope.messages = sync.$asArray();

  var get = function(query) {
    return $http({
      method: 'GET',
      url: 'https://www.quandl.com/api/v1/datasets/WIKI/' + query.toUpperCase() + '.csv?auth_token=Lmzt-LAWzHDzykUrZYU8&column=4&collapse=weekly&trim_start=2000-01-01&trim_end=2014-01-01&sort_order=asc&transformation=rdiff'
    })
    .then(function(resp){
      // console.log(resp.data);
      return resp.data;
    });
  };

  var addStock = function (query) {
    return $http({
      method: 'POST',
      url: '/api/stocks',
      data: stocks
    });
  };


  return {
    get: get,
    addStock: addStock
  };


})

angular.module('getWeatherData', []) //what is this exactly
  .factory('loadSunnyCity', function($http) {//$http pass through
    var getSunnyCity = function(latitude, longitude){
      return $http({
        method: 'GET',
        url: '/weather/box',
        params: {lat: latitude, long: longitude}
      }).then(function(response) {
        return response.data;
      }, function() {
        alert('Unable to get data');
      });
    };
    return {
      getClosestSunnyCity: getSunnyCity
    };
  });

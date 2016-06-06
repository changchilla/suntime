'use strict';

angular.module('myApp.view1', ['ngRoute', 'getWeatherData', 'temperature'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$rootScope', '$http', 'loadSunnyCity', 'temperatureConversion', function($scope, $rootScope, $http, loadSunnyCity, temperatureConversion) { //why is this in an array. How does http get loaded, why not a requirement in the module up top? are these only services dependencies?

  $scope.init = function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      loadSunnyCity.getClosestSunnyCity(position.coords.latitude, position.coords.longitude)
        .then(function(data){
          $scope.currentLat = position.coords.latitude;
          $scope.currentLong = position.coords.longitude;
          $scope.data = data;
        })

    });
  };

  $scope.convertToFarenheit = function(celsius) {
    return temperatureConversion.celsiusToFarenheit(celsius)
  };

  this.getSunnyCity = function() {
    loadSunnyCity.getClosestSunnyCity($scope.currentLat, $scope.currentLong)
      .then(function(data) {
        $scope.data = data;
      });
  };

}]);
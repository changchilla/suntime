angular.module('temperature', [])
  .factory('temperatureConversion', function() {
    var celsiusToFarenheit = function(celsius){
      return celsius *  9/5 + 32
    };
    return {
      celsiusToFarenheit: celsiusToFarenheit
    };
  });

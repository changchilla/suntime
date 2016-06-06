var express = require('express');
var router = express.Router();
var request = require('request');
var _       = require('lodash');
var weatherController = require('../controllers/weather.js')

// HIDE KEYS

// takes latitude and longitude and finds 10 mile square around this point
// in reality since curved, we can't do simple pythagorean assumptions to determine distance
// also what about negative distance? Need to determine which part of the world you're on.. that determines geolocation
// lon-left,lat-bottom,lon-right,lat-top
// 33, 13 -> 7, 28, 18, 38
function getSquareZone(lat, long) {
    var squareParams = {
        lonLeft: long - 5,
        lonRight: long + 5,
        latTop: lat + 5,
        latBottom: lat - 5
    };
    // what was the last param?
    return squareParams.lonLeft + ',' + squareParams.latBottom + ',' + squareParams.lonRight + ',' + squareParams.latTop + ',10';
}

function findClosestSunnyLocation(citiesInSquare, lat, long) {
    //citiesInSquare.list[0].weather[0].main openweathermap api response type
    // Do this all in one go
    var sunnyCities = _.filter(citiesInSquare.list, function(city){
        return city.weather[0].main === 'Clear'
    });
    _(sunnyCities).forEach(function(sunnyCity) {
        var cityLat = sunnyCity.coord.lat;
        var cityLong = sunnyCity.coord.lon;
        // separate method
        var distanceFromPoint = Math.sqrt(Math.pow(cityLat - lat, 2) + Math.pow(cityLong - long, 2));//square root of difference between a squared and difference between b squared
        sunnyCity.distanceAway = distanceFromPoint;
    });
    var closestSunnyCity = _.minBy(sunnyCities, function(sunnyCity) {
        return sunnyCity.distanceAway;
    });
    return closestSunnyCity;
}

function callWeatherBox(req, res, next) {
    var lat = Number(req.query.lat);
    var long = Number(req.query.long);
    var url = 'http://api.openweathermap.org/data/2.5/box/city';
    var openWeatherParams = {
        bbox: getSquareZone(lat, long),
        appid: 'someid',//set up in config file
        cluster: 'yes'
    };
    return request({url: url, qs: openWeatherParams}, function(error, response, body){
        if (!error && response.statusCode == 200) {
            var sunnyCity = findClosestSunnyLocation(JSON.parse(response.body), lat, long);
            res.send(sunnyCity)
        }
    });
}

router.get('/box', callWeatherBox);
// router.get('/box', weatherController.callWeatherBox);

module.exports = router;

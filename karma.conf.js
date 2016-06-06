module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app2/bower_components/angular/angular.js',
      'app2/bower_components/angular-route/angular-route.js',
      'app2/bower_components/angular-mocks/angular-mocks.js',
      'app2/components/**/*.js',
      'app2/view*/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};

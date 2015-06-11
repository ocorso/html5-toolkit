var app = angular.module('app', [
  'ngMaterial', 
  'ngAnimate', 
  'ngRoute',
  'ngMdIcons',
  'ngSanitize',
  'toolkit',
  'splash'
]);

/*
 * set app colors and routing
 */
app.config(function($mdThemingProvider, $routeProvider) {
  // material colors
  $mdThemingProvider.theme('default')
    .primaryPalette('deep-orange', {
      'default': '500',
      'hue-1': '200',
      'hue-2': '100',
    })
    .accentPalette('light-blue', {
      'default': '700',
      'hue-1': '800',
      'hue-2': '100'
    })
    .warnPalette('red');

  // routing
  $routeProvider.when('/html5/toolkit', {
    templateUrl: 'app/splash/_splash_tab2.html',
    controller: 'SplashCtrl as splash'

  // }).when('/html5/toolkit', {
  //   templateUrl: 'app/splash/_splash_tab2.html',
  //   controller: 'SplashCtrl as splash'

  }).when('/html5/toolkit/:item', {
    templateUrl: 'app/toolkit/_toolkit.html',
    controller: 'ToolkitCtrl as toolkit'

  }).otherwise({
    redirectTo: '/html5/toolkit'
  });
});


/*
 * main controller that is accessible in any view
 */
app.controller('MainCtrl', function($scope, $window, $sce, $location, $timeout) {

  $scope.main.progress = true;
  
  var main = this;

  // safe HTML
  main.safeHtml = function(html) {
    return $sce.trustAsHtml(html);
  };

  // MEDIAQUERIES
  // on load
  $scope.$watch(function() {
    return window.innerWidth;

  }, function(width) {
    if( width <= 600 ) {
      main.size = 'sm';

    } else if( width > 600 && width <= 960 ) {
      main.size = 'md';
    
    } else {
      main.size = 'lg';
    }
  });

  // on resize
  $window.onresize = function() {
    var width = window.innerWidth;

    if( width <= 600 ) {
      $scope.$apply(function() {
        main.size = 'sm';
      });

    } else if( width > 600 && width <= 960 ) {
      $scope.$apply(function() {
        main.size = 'md';
      });
    
    } else {
      $scope.$apply(function() {
        main.size = 'lg';
      });
    }
  };
});


// custom filter that takes title of toolkit item
// and hyphenates it if it's more than 1 word a
app.filter('hyphenate', function() {
  return function(str) {
    if( str != undefined ) {
      return str.split(' ').join('-');
    }
  }
});

// capitalize first letter of string
app.filter('capitalize', function() {
  return function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
});
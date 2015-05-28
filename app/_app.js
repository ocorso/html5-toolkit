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
    .primaryPalette('light-blue', {
      'default': '700',
      'hue-1': '800',
      'hue-2': '100'
    })
    .accentPalette('deep-orange', {
      'default': '500',
      'hue-1': '200',
      'hue-2': '100',
    })
    .warnPalette('red');

  // routing
  $routeProvider.when('/html5/welcome', {
    templateUrl: 'app/splash/_splash.html',
    controller: 'SplashCtrl as splash'

  }).when('/html5/toolkit/:item', {
    templateUrl: 'app/toolkit/_toolkit.html',
    controller: 'ToolkitCtrl as toolkit'

  }).otherwise({
    redirectTo: '/html5/welcome'
  });
});


/*
 * Firebase toolkit items
 */
app.factory('ToolkitData', function($http) {
  var url = 'https://html5-toolkit.firebaseio.com/.json';
  var toolkit = {};

  toolkit.items = function() {
    return $http.jsonp(url + '?callback=JSON_CALLBACK');
  };

  return toolkit;
});


/*
 * main controller that is accessible in any view
 */
app.controller('MainCtrl', function($scope, $mdSidenav, $window, $sce, 
  $location, $routeParams, SplashContent, ToolkitData) {
  
  var main = this;

  main.toggleRightNav = function() {
    $mdSidenav('RightNavPanel').toggle();
  };

  main.closeRightNav = function() {
    $mdSidenav('RightNavPanel').close();
  };

  // safe HTML
  main.safeHtml = function(html) {
    return $sce.trustAsHtml(html);
  };

  // set active nav on nav panel
  main.activeNav = function(path) {
    var path_split = $location.path().split('/');
    var page_view = path_split[3];

    return path === page_view;
  };

  // get Firebase toolkit data
  ToolkitData.items().success(function(data) {
    main.toolkitItems = data['toolkit-items'];

  }).error(function() {
    console.log('Error loading in Firebase data.');
  });


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

    main.closeRightNav();

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
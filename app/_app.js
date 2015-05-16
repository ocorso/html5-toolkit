var app = angular.module('app', [
  'ngMaterial',
  'ngAnimate',
  'ngRoute',
  'ngMdIcons',
  'ngSanitize',
  'welcome',
  'toolkit'
]);

/*
 * set app colors and routing
 */
app.config(function($mdThemingProvider, $routeProvider) {
  // material colors
  $mdThemingProvider.theme('default')
    .primaryPalette('light-blue', {
      'default': '700',
      'hue-1': '800'
    })
    .accentPalette('pink', {
      'default': '500',
      'hue-1': '200',
      'hue-2': '100',
    })
    .warnPalette('red');

  // routing
  $routeProvider.when('/h5tk/welcome', {
    templateUrl: 'app/welcome/_welcome.html',
    controller: 'WelcomeCtrl as welcome'

  }).when('/h5tk/:toolkit', {
    templateUrl: 'app/toolkit/_toolkit.html',
    controller: 'ToolkitCtrl as toolkit'

  }).otherwise({
    redirectTo: '/h5tk/welcome'
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
app.controller('MainCtrl', ['$sce', function($scope, $sce, $mdSidenav, $window, $routeParams,
  ToolkitData) {

  var main = this;

  // toggle nav
  main.toggleNav = function() {
    $mdSidenav('navPanel').toggle();
  };

  main.closeNav = function() {
    $mdSidenav('navPanel').close();
  }


  // get Firebase data
  ToolkitData.items().success(function(data) {
    main.toolkitItems = $sce.trustAsHtml(data['toolkit-items']);

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

    main.closeNav();

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
}]);


// custom filter that takes title of toolkit item
// and hyphenates it if it's more than 1 word a
app.filter('hyphenate', function() {
  return function(str) {
    return str.split(' ').join('-');
  }
});

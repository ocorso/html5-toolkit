var splash = angular.module('splash', []);

splash.controller('SplashCtrl', function($scope, $location, SplashContent,
  ToolkitData, $timeout, $window) {

  $window.ga('send', 'pageview', { page: 'splash-page' })

  // set active Tab & breadcrumbs
  $scope.main['toolkit-item-view'] = false;

  if( $location.path() == '/html5/toolkit' ) {
    $scope.main['selected-tab'] = 1;
    $scope.main['toolkit-view'] = true;
 
  } else {
    $scope.main['selected-tab'] = 0;
    $scope.main['toolkit-view'] = false;
  }

  var splash = this;

  // get splash grid
  splash.grid = SplashContent.grid;

	// get Firebase data
  ToolkitData.items().success(function(data) {
    splash.toolkitItems = data['toolkit-items'];
    $scope.main.progress = false;

    // loop through data to get all categories
    var categories_array = splash.toolkitItems[splash.toolkitItems.length] = [];
    var matching_array = [];

    for( var i = 0; i < splash.toolkitItems.length - 1; i++ ) {
      var category = splash.toolkitItems[i].category;

      if( matching_array.indexOf(category) == -1 ) {
        matching_array.push(category);
      }
    }

    // loop through array and push categories as objects
    // into the toolkit items
    for( var i = 0; i < matching_array.length; i++) {
      var category = matching_array[i];
      categories_array.push({'category':category});
    }

    // Masonry
    var msnry;
    var cards = document.getElementsByClassName('category-card');
    var card_row_length;

    splash.cardGrid = function() {
      $timeout(function() {
        for( var i = 0; i < categories_array.length; i++ ) {
          if( cards[i].children.length - 1 == 0 ) {
            categories_array[i].hide = true;

          } else {
            categories_array[i].hide = false;
          }
        };
      }, 700);
    };

  }).error(function() {
    console.log('Error loading in Firebase data.');
  });
});
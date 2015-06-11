var splash = angular.module('splash', []);

splash.controller('SplashCtrl', function($scope, $location, SplashContent,
  ToolkitData, $timeout) {

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
    splash.toolkitItems.categories = [];
    var matching_array = [];

    for( var i = 0; i < splash.toolkitItems.length; i++ ) {
      var category = splash.toolkitItems[i].category;

      if( matching_array.indexOf(category) == -1 ) {
        matching_array.push(category);
      }
    }

    // loop through array and push categories as objects
    // into the toolkit items
    for( var i = 0; i < matching_array.length; i++) {
      var category = matching_array[i];
      splash.toolkitItems.categories.push({category});
    }

    // Masonry
    $timeout(function() {
      var msnry = new Masonry('.categories');
      var cards_length;

      splash.cardsLength = function() {
        cards_length = document.getElementsByClassName('category-card').length;
      };

      splash.initMasonry = function() {
        if( cards_length != splash.toolkitItems.categories.length ) {
          msnry = new Masonry('.categories');

        } else {
          msnry.layout();
        }
      };
    });

  }).error(function() {
    console.log('Error loading in Firebase data.');
  });
});
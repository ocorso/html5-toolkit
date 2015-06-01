var splash = angular.module('splash', []);

splash.controller('SplashCtrl', function($scope, $location, SplashContent,
  ToolkitData) {

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

  }).error(function() {
    console.log('Error loading in Firebase data.');
  });
});
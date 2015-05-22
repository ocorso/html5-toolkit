var splash = angular.module('splash', []);

splash.controller('SplashCtrl', function($scope, ToolkitData) {
	$scope.main.progress = true;
  $scope.main.item = false;

	var splash = this;

	// get Firebase data
  ToolkitData.items().success(function(data) {
    splash.toolkitItems = data['toolkit-items'];
    $scope.main.progress = false;

  }).error(function() {
    console.log('Error loading in Firebase data.');
  });
});
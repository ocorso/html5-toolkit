var welcome = angular.module('welcome', []);

welcome.controller('WelcomeCtrl', function($scope, ToolkitData) {
	$scope.main.progress = true;
  $scope.main.pageTitle = 'HTML Transition';

	var welcome = this;

	// get Firebase data
  ToolkitData.items().success(function(data) {
    welcome.toolkitItems = data['toolkit-items'];
    $scope.main.progress = false;

  }).error(function() {
    console.log('Error loading in Firebase data.');
  });
});
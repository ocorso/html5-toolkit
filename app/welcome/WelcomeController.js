var welcome = angular.module('welcome', []);

welcome.controller('WelcomeCtrl', function($scope, ToolkitData) {
	$scope.main.pageTitle = 'Welcome';

	var welcome = this;

	// get Firebase data
  ToolkitData.items().success(function(data) {
    welcome.toolkitItems = data['toolkit-items'];

  }).error(function() {
    console.log('Error loading in Firebase data.');
  });
});
var welcome = angular.module('welcome', []);

welcome.controller('WelcomeCtrl', ['$sce', function($scope, $sce, ToolkitData) {
	$scope.main.pageTitle = 'Welcome';

	var welcome = this;

  welcome.safeHtml = function(html) {
    return $sce.trustAsHtml(html);
  };

	// get Firebase data
  ToolkitData.items().success(function(data) {
    welcome.toolkitItems = data['toolkit-items'];
    console.log(welcome.toolkitItems);

  }).error(function() {
    console.log('Error loading in Firebase data.');
  });
}]);

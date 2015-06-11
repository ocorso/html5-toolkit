var toolkit = angular.module('toolkit', []);

toolkit.controller('ToolkitCtrl', function($scope, $routeParams, $location,
	$timeout, ToolkitData) {

	$scope.main['selected-tab'] = 1;
	$scope.main['toolkit-view'] = true;
	$scope.main['toolkit-item-view'] = true;
	$scope.main.item = $routeParams.item.split(' ').join('-').toLowerCase();

	var toolkit = this;

	// get Firebase data
  ToolkitData.items().success(function(data) {
    toolkit.toolkitItems = data['toolkit-items'];
    $scope.main.progress = false;
    console.log(toolkit.toolkitItems);

		// loop through all toolkit items to check if url param exists
		// if not, redirect to welcome view
		// if so, show correct toolkit content
	  $scope.main.title;

	  var match = 0;
	  var itemIndex;
	  var titleFiltered;

	  for( var i = 0; i < toolkit.toolkitItems.length; i++ ) {
	  	$scope.main.title = toolkit.toolkitItems[i].title;
	  	titleFiltered = $scope.main.title.split(' ').join('-').toLowerCase();

	  	if( $scope.main.item == titleFiltered ) {
	  		match++;
	  		itemIndex = i;

	  		break;

	  	} else {
	  		continue;
	  	}
	  }

	  if( match == 1 ) {
	  	toolkit.content = toolkit.toolkitItems[itemIndex];
	  	$scope.main['toolkit-item'] = $scope.main.title;
	  	$location.path('/html5/toolkit/' + titleFiltered);

	  } else {
	  	$location.path('/html5/toolkit');
	  }

  }).error(function() {
    console.log('Error loading in Firebase data.');
  });
});
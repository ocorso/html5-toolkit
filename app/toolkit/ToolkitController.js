var toolkit = angular.module('toolkit', []);

toolkit.controller('ToolkitCtrl', function($scope, $routeParams, $location, 
	ToolkitData) {

	var toolkit = this;

	$scope.main.progress = true;

	// get Firebase data
  ToolkitData.items().success(function(data) {
    toolkit.toolkitItems = data['toolkit-items'];
    $scope.main.progress = false;

	  // loop through all toolkit items to check if url param exists
	  // if not, redirect to welcome view
	  // if so, show correct toolkit content
	  $scope.main.item = $routeParams.item;
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

	  } else {
	  	$location.path('/html5/welcome');
	  }

  }).error(function() {
    console.log('Error loading in Firebase data.');
  });
});
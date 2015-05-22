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
	  var param = $routeParams.item;
	  var match = 0;
	  var pageTitle;
	  var itemIndex;
	  var title;
	  var titleFiltered;

	  for( var i = 0; i < toolkit.toolkitItems.length; i++ ) {
	  	title = toolkit.toolkitItems[i].title;
	  	titleFiltered = title.split(' ').join('-').toLowerCase();

	  	if( param == titleFiltered ) {
	  		match++;
	  		pageTitle = title;
	  		itemIndex = i;

	  		break;

	  	} else {
	  		continue;
	  	}
	  }

	  if( match == 1 ) {
	  	$scope.main.pageTitle = 
		  	'<a href="#/html5/welcome>' +
			  	'HTML5 Transition' +
		  	'</a>' +
		  	'>' +
		  	'<a ng-click="main.toggleRightNav()">' +
			  	'Toolkit' +
		  	'</a>' +
		  	'>' +
		  	'<a href="#/html5/toolkit/' + titleFiltered + '">' +
			  	pageTitle +
		  	'</a>';

	  	toolkit.content = toolkit.toolkitItems[itemIndex];

	  } else {
	  	$location.path('/html5/welcome');
	  }

  }).error(function() {
    console.log('Error loading in Firebase data.');
  });
});
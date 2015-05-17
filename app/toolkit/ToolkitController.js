var toolkit = angular.module('toolkit', []);

toolkit.controller('ToolkitCtrl', ['$sce', function($scope, $sce, $routeParams, $location,
	ToolkitData) {

	var toolkit = this;

	toolkit.safeHtml = function(html) {
	  return $sce.trustAsHtml(html);
	};

	// get Firebase data
  ToolkitData.items().success(function(data) {
    toolkit.toolkitItems = data['toolkit-items'];

	  // loop through all toolkit items to check if url param exists
	  // if not, redirect to welcome view
	  // if so, show correct toolkit content
	  var param = $routeParams.toolkit;
	  var match = 0;
	  var pageTitle;
	  var itemIndex;

	  for( var i = 0; i < toolkit.toolkitItems.length; i++ ) {
	  	var title = toolkit.toolkitItems[i].title;
	  	var titleFiltered = title.split(' ').join('-').toLowerCase();

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
	  	$scope.main.pageTitle = pageTitle;
	  	toolkit.content = toolkit.toolkitItems[itemIndex];
	  	console.log(toolkit.content);

	  } else {
	  	$location.path('/h5tk/welcome');
	  }

  }).error(function() {
    console.log('Error loading in Firebase data.');
  });
}]);

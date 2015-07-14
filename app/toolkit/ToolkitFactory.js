/*
 * Firebase toolkit items
 */
toolkit.factory('ToolkitData', function($http) {
  // var url = 'https://html5-toolkit.firebaseio.com/.json';
  var url = '../../json/html5-toolkit-export.json';
  var toolkit = {};

  toolkit.items = function() {
    // return $http.jsonp(url + '?callback=JSON_CALLBACK');
    return $http.get(url);
  };

  return toolkit;
});
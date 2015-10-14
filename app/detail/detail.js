'use strict';

angular.module('app.detail', ['ngRoute', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/detail/:detailId', {
        templateUrl: './detail/detail.html',
        controller: 'DetailCtrl'
  });
}])

.controller('DetailCtrl', ["$scope", "$routeParams","$http",function($scope, $routeParams, $http) {
        /** Load the marker */
        $http.get("api/nodes/"+$routeParams.detailId).success(function (marker) {
            $scope.current=marker;
        });
    }])
    // @TODO stringify with links on the resources.
.filter('prettyJSON', function () {
    function prettyPrintJson(json) {
        return JSON ? JSON.stringify(json, null, '  ') : 'cannot pretty print';
    }
    return prettyPrintJson;
})
.filter('shrink', function () {
    function shrink(string) {
        if(typeof string === 'undefined'){
            return 'token';
        } else {
            // @TODO replace this thing with a uri parameter.
           // return string.replace( /^\D+/g, '');
            return string.replace(/.*?(\d+)[^\d]*$/,'$1');
        }
    }
    return shrink;
});
;
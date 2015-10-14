'use strict';

angular.module('app', [
                'ngRoute',
                'app.detail',
                'app.master'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/master'});
}]);

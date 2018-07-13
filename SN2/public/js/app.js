'use strict';

/* App Module */

var timeLineApp = angular.module('timeLineApp', [
	'ngRoute',
	'timeLineControllers',
	'timeLineServices'
]);

timeLineApp.config(['$routeProvider', '$httpProvider',
	function($routeProvider, $httpProvider) {
		$routeProvider.
			when('/t1', {
				templateUrl: "partials/task1.html",
				controller: "Task1Ctrl"
			}).
			when('/t2', {
				templateUrl: "partials/task2.html",
				controller: "Task2Ctrl"
			}).
			when('/t3', {
				templateUrl: "partials/task3.html",
				controller: "Task3Ctrl"
			}).
			when('/t4', {
				templateUrl: "partials/task4.html",
				controller: "Task4Ctrl"
			}).
			otherwise({
				redirectTo: '/t1'
			});
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
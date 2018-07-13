'use strict';

/* Services */

var timeLineServices = angular.module ('timeLineServices', ['ngResource']);

timeLineServices.factory ('HeartBeat', ['$resource',
	
	function($resource) {

		// return $resource(url, {}, {
		// 	query: { method: 'GET', params: {
		// 		id: '1',
		// 		pwd: "yaihala"
		// 	}, isArray: false,
		// 		headers: {'Content-Type':'text/plain'}
		// 	 }
		// });
		return $resource ('/heartbeat');
	}]);

timeLineServices.factory ('Task1Service', ['$resource', 

	function($resource) {
		return $resource ('/task1', {
			query: { method: "GET", 
			params: {
				id: '@id',
				password: '@password',
				isArray: false
			}, 
			headers: {'Content-Type': 'text/json'}
		}
	});
	}]);

timeLineServices.factory ('Task2Service', ['$resource', 
	function($resource) {
		return $resource(
			'/task2', {
				query: {
					method: "GET",
					params: {
						id: "@id"
					},
					isArray: false
				},
				headers: {
					'Content-Type': 'text/json'
				}
			});
	}]);

timeLineServices.factory ('Task3Service', ['$resource',
	function($resource) {
		return $resource(
			'/task3', {
				query: {
					method: "GET",
					params: {
						id: "@id"
					},
					isArray: false
				},
				headers: {
					'Content-Type': 'text/json'
				}
			});
	}]);


timeLineServices.factory ('Task4Service', ['$resource',
	function($resource) {
		return $resource(
			'/task4', {
				query: {
					method: "GET",
					params: {
						id: "@id"
					},
					isArray: false
				},
				headers: {
					'Content-Type': 'text/json'
				}
			});
	}]);


timeLineServices.factory ('Task5Service', ['$resource',
	function($resource) {
		return $resource(
			'/task5', {
				query: {
					method: "GET",
					params: {
						id: "@id"
					},
					isArray: false
				},
				headers: {
					'Content-Type': 'text/json'
				}
			});
	}]);




'use strict';

/* Controllers */

var timeLineControllers = angular.module('timeLineControllers', []);

/* 
  Test image
*/
var imgSrc = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRKupZ4FBII7MraAQCiPlLpCGeS1M-iHxsK81yGSbfeINy7n1oIs879v752";

// These two variables will help to make dates pretty
var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

timeLineControllers.controller('Task1Ctrl', ['$scope', 'Task1Service', 
  function($scope, Task1Service) {
  $scope.task1go = function () {
    
    var resp = Task1Service
      .get({id: $scope.id, password: $scope.password}, function() {
        $scope.name = resp.name;
        $scope.profile = resp.profile;
    });
  };

}]);

timeLineControllers.controller('Task2Ctrl', ['$scope', 'Task2Service',
  function($scope, Task2Service) {
  $scope.task2go = function () {

    var resp = Task2Service
      .get({id: $scope.id}, function() {
        $scope.name = resp.name;
        $scope.profile = resp.profile;
        $scope.followers = resp.followers;
        $scope.followerCount = $scope.followers.length;
      });
  };
}]);

timeLineControllers.controller('Task3Ctrl', ['$scope', 'Task3Service',
  function($scope, Task3Service) {
	$scope.loading = false;

  $scope.task3go = function () {
    $scope.loading = true;

    var resp = Task3Service
      .get({id: $scope.id}, function() {
        // Lets make the dates on the posts pretty before we return
				for (var i = 0; i  < resp.comments.length; i++) {
					var postDate = new Date(resp.comments[i].timestamp * 1000);
					resp.comments[i].timestamp = dayNames[postDate.getDay()] + " " + postDate.getDate() + " " + monthNames[postDate.getMonth()] + " " + postDate.getFullYear()
																		+ " " + ("0" + postDate.getHours()).slice(-2) + ":" + ("0" + postDate.getMinutes()).slice(-2) + ":" + ("0" + postDate.getSeconds()).slice(-2);
				}

				// Set the section title
        $scope.loading = false;
        $scope.pageTitle = "Comments by " + $scope.id;
        $scope.posts = resp.comments;
      });
  };
}]);

// Had to change json attr "posts" to "comments", so some references to "posts" still exist
timeLineControllers.controller('Task4Ctrl', ['$scope', 'Task4Service',
  function($scope, Task4Service) {
	$scope.loading = false;

  $scope.task4go = function () {
    $scope.loading = true;

    var resp = Task4Service
      .get({id: $scope.id}, function() {

				// Try and make the dates pretty; starting with normal posts, then parent, then grandparents
				for (var i = 0; i  < resp.comments.length; i++) {
          var postDate = new Date(resp.comments[i].timestamp * 1000);
          resp.comments[i].timestamp = dayNames[postDate.getDay()] + " " + postDate.getDate() + " " + monthNames[postDate.getMonth()] + " " + postDate.getFullYear()
                                    + " " + ("0" + postDate.getHours()).slice(-2) + ":" + ("0" + postDate.getMinutes()).slice(-2) + ":" + ("0" + postDate.getSeconds()).slice(-2);
					resp.comments[i].depth = 1;

					if( typeof resp.comments[i].parent !== 'undefined' ) {
						postDate = new Date(resp.comments[i].parent.timestamp * 1000);
						resp.comments[i].parent.timestamp = dayNames[postDate.getDay()] + " " + postDate.getDate() + " " + monthNames[postDate.getMonth()] + " " + postDate.getFullYear()
                                    + " " + ("0" + postDate.getHours()).slice(-2) + ":" + ("0" + postDate.getMinutes()).slice(-2) + ":" + ("0" + postDate.getSeconds()).slice(-2);
						resp.comments[i].depth = 2;
					}

					if( typeof resp.comments[i].grand_parent !== 'undefined' ) {
						postDate = new Date(resp.comments[i].grand_parent.timestamp * 1000);
						resp.comments[i].grand_parent.timestamp = dayNames[postDate.getDay()] + " " + postDate.getDate() + " " + monthNames[postDate.getMonth()] + " " + postDate.getFullYear()
                                    + " " + ("0" + postDate.getHours()).slice(-2) + ":" + ("0" + postDate.getMinutes()).slice(-2) + ":" + ("0" + postDate.getSeconds()).slice(-2);
						resp.comments[i].depth = 3;
					}
        }

        $scope.loading = false;
        $scope.name = resp.name;
        $scope.profile = resp.profile;
        $scope.followers = resp.followers;
        $scope.followerCount = $scope.followers.length;
        $scope.posts = resp.comments;
      });
  };
}]);

timeLineControllers.controller('Task5Ctrl', ['$scope', 'Task5Service', 
  function($scope, Task5Service) {
  $scope.loading = false;

  $scope.task5go = function () {
    $scope.loading = true;

    var resp = Task5Service
      .get({id: $scope.id}, function() {

        $scope.loading = false;
        $scope.recommendation = resp.recommendation;
      });


  };

}]);

angular.module('metrobuzz', ['ngRoute', 'firebase'])

    .value('fbURL', 'https://metrobuzz.firebaseio.com/')

    .factory('Stations', function ($firebase, fbURL) {
        return $firebase(new Firebase(fbURL));
    })

    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    })

    .controller('HomeController', function ($scope, Stations) {
        $scope.stations = Stations;
        $scope.rate = function (rating) {
            $scope.stations.$child($scope.station).$add(rating);
        };
    });
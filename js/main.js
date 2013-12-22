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
        $scope.current_congestion = 0;
        $scope.rate = function (rating) {
            $scope.stations.$child($scope.station).$add(rating);
            $scope.submitted = true;
        };
        $scope.stations.$on('loaded', function (response) {
            $scope.$watch('station', function () {
                var station = response[$scope.station] || {},
                    sum = 0,
                    rating_count = Object.keys(station).length;
                for (var rating in station) {
                    sum += station[rating];
                }

                var average;
                if (!sum) {
                   average = 0;
                } else {
                   average = Math.ceil(sum / rating_count);
                }

                $scope.current_congestion = average;
            });
        });
    });
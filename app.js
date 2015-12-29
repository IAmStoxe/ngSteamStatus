/**
 * Created by dstokes on 12/29/2015.
 */

var app = angular.module('ngCSGOStatus', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {


    $routeProvider.when('/',
        {
            templateUrl: '/',
            controller: 'SteamStatusCtrl'
        })
        .otherwise(
            {
                redirectTo: '/',
                controler: 'SteamStatusCtrl'
            });
}]);

app.filter('caps', function () {
    return function (input, all) {
        try {
            var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
            return (!!input) ? input.replace(reg, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }) : '';
        } catch (e) {
            console.log(e);
        }
    }
});

app.controller('SteamStatusCtrl', function ($scope, $http) {
    "use strict";

    $scope.ApiKey = '';
    $scope.SteamDataResponse = {};

    var GAME_SERVER_STATUS_URL = 'https://api.steampowered.com/ICSGOServers_730/GetGameServersStatus/v1/?key=' + $scope.ApiKey;

    function getSteamStatus() {
        console.log('Contacting Steam API...');
        $http.get(GAME_SERVER_STATUS_URL)
            .then(function onSuccess(data) {
                    console.log('Data Received.');
                    console.log(JSON.stringify(data));
                    $scope.SteamDataResponse = data.data;

                }, function onError(err) {
                    console.log(JSON.stringify(err));
                }
            );
    }

    $scope.getClass = function (status) {
        if (status.toString() == "offline") {
            return "label label-danger label-as-badge pull-right";
        }
        if (status.toString() == "normal") {
            return "label label-success label-as-label label-success label-as-badge pull-right pull-right";
        }
        if (status.toString() == "idle") {
            return "label label-success label-as-badge pull-right";
        }
        if (status.toString() == "delayed") {
            return "label label-info label-as-badge pull-right";
        }
        if (status.toString() == "low") {
            return "label label-success label-as-badge pull-right";
        }
        if (status.toString() == "medium") {
            return "label label-success label-as-badge pull-right";
        }
        if (status.toString() == "full") {
            return "label label-info label-as-badge pull-right";
        }
        return "label label-primary label-as-badge pull-right";
    };

    getSteamStatus();

});
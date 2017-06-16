function Sensors($scope, $http, $interval, SensorsService) {

    var getSensorsData = function(){
        SensorsService.getSensorsData().then(function () {
            $scope.sensors = SensorsService.getFutureEvents();
        }, function (error) {
            console.log(error);
        });
    }

    getSensorsData();
    $interval(getSensorsData, config.sensorService.refreshInterval * 60000 || 1800000)
}

angular.module('SmartMirror')
    .controller('Sensors', Sensors);

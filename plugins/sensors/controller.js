function Sensors($scope, $http, $interval, SensorsService) {

      var refreshSensors = function() {
          $scope.sensors = [];
                      console.log ("Refreshing Sensors");
                      SensorsService.refreshSensors().then(function() {
                        var sensors = SensorsService.getSensorsData();
                        if(sensors.length > 0)
                          $scope.sensors = sensors;
                        console.log($scope.sensors);
                      });
                  };

    refreshSensors();
    $interval(refreshSensors , 10 * 60000 || 900000)
}

angular.module('SmartMirror')
    .controller('Sensors', Sensors);

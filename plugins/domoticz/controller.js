function Domoticz($scope, $http, $interval, DomoticzService) {

  var refreshSensors = function() {
      $scope.domoticz = [];
                  console.log ("Refreshing Sensors");
                  DomoticzService.refreshSensors().then(function() {
                    var sensors = DomoticzService.getSensorsData();
                    if(sensors.length > 0)
                      $scope.domoticz = sensors;
                    console.log($scope.domoticz);
                  });
              };

refreshSensors();
$interval(refreshSensors , 10 * 60000 || 900000)
}

angular.module('SmartMirror')
    .controller('Domoticz', Domoticz);

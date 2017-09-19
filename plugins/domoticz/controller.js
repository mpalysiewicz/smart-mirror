function Domoticz($scope, $http, $interval, DomoticzService) {

  var refreshDomoticzSensors = function() {
      $scope.domoticz = [];
                  console.log ("Refreshing Domoticz Sensors");
                  DomoticzService.refreshDomoticzSensors().then(function() {
                    console.log("Then Domoticz");
                    var sensors = DomoticzService.getSensorsData();
                    console.log("Domoticz sensor", sensors);
                    if(sensors.length > 0)
                      $scope.domoticz = sensors;
                    console.log("Domototicz if", sensors);
                  });
              };

refreshDomoticzSensors();
$interval(refreshDomoticzSensors , 10 * 60000 || 900000)
}

angular.module('SmartMirror')
    .controller('Domoticz', Domoticz);

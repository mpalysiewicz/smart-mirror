(function () {
  'use strict';

function DomoticzService($http, $q){
        var service = {};
        service.domoticzSensorList = [];

        service.init = function(){
            var promises = [];
            angular.forEach(config.domoticzService.sensors, function(sensor) {
              console.log('URL 1', config.domoticzService.address+':'+config.domoticzService.port+'/json.htm?type=devices&rid='+sensor.id);
                promises.push($http.get(config.domoticzService.address+':'+config.domoticzService.port+'/json.htm?type=devices&rid='+sensor.id));
                //promises.push($http.get(config.sensorService.address+sensor.id+'/lastValue'));
            });

            return $q.all(promises).then(function(response) {
                console.log('response loaded')
                service.domoticzSensorList = [];
                console.log('sensor list loaded')
                for (var i=0; i < response.length; i++){
                    if(response[i].data.id !== undefined){
                        processJson(JSON.parse(response));
                        service.domoticzSensorList.push(response[i].data);
                    }
                }
            });
        }

        service.refreshDomoticzSensors = function() {
            return service.init().then(function(entries) {
                return entries;
            });
        };

        service.getSensorsData = function() {
            return service.domoticzSensorList;
            console.log("sensorList", service.domoticzSensorList);
        };


		return service;
    }

    angular.module('SmartMirror').factory('DomoticzService', DomoticzService);
} ());


/*
updateDomo: function() {
var i = 0;
for (var c in config.domoticzService.sensors) {
console.log("this is c: " + c);
var sensor = this.sensors[c];
var url = config.domoticzService.address+':'+config.domoticzService.port+"/json.htm?type=devices&rid="  + sensor.id);
var self = this;

var domoRequest = new XMLHttpRequest();
domoRequest.open("GET", url, true);
domoRequest.onreadystatechange = function() {
if (this.readyState === 4) {
  if (this.status === 200) {
    self.processJson(JSON.parse(this.response));
    console.log("Loaded data");
  } else {
    Log.error(self.name + ": Could not load data.");
    console.log("Did not load data");
  }
}
};
domoRequest.send();
i++;
}
} */

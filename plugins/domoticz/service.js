(function () {
  'use strict';

function DomoticzService($http, $q){
        var service = {};
        service.sensorList = [];

        function getSensorById(sensors, id) {
            for (var i=0; i < sensors.length; i++){

                if(sensors[i].id == id){
                    return config.sensorService.sensors[i];}
            }
            return null;
        }

        service.init = function(){
            var promises = [];
            angular.forEach(config.domoticzService.sensors, function(sensor) {
              console.log('URL', config.domoticzService.address+':'+config.domoticzService.port+'/json.htm?type=devices&rid='+sensor.id);
                promises.push($http.get(config.domoticzService.address+':'+config.domoticzService.port+'/json.htm?type=devices&rid='+sensor.id));
            });

            return $q.all(promises).then(function(response) {
                service.sensorList = [];
                for (var i=0; i < response.length; i++){

                    if(response[i].data.id !== undefined){
                        response[i].data.name = getSensorById(config.domoticzService.sensors, response[i].data.id).name;
                        service.sensorList.push(response[i].data);
                    }
                }
            });
        }

        service.refreshSensors = function() {
            return service.init().then(function(entries) {
                return entries;
            });
        };

        service.getSensorsData = function() {
            return service.sensorList;
        };


		return service;
    }

    angular.module('SmartMirror').factory('DomoticzService', DomoticzService);
} ());

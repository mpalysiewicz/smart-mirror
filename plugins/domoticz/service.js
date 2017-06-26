(function () {
  'use strict';

function DomoticzService($http, $q){
        var service = {};
        service.domoticzSensorList = [];

        function getSensorById(sensors, id) {
            for (var i=0; i < sensors.length; i++){

                if(sensors[i].id == id){
                    return config.domoticzService.sensors[i];}
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
              console.log('length', response.length);
                service.domoticzSensorList = [];
                for (var i=0; i < response.length; i++){
                    console.log('responseDomoticz1', response[i].data.id);
                    if(response[i].data.id !== undefined){
                      console.log('responseDomoticz2', response[i].data.name);
                        response[i].data.name = getSensorById(config.domoticzService.sensors, response[i].data.id).name;
                        console.log('response2', response[i].data.name);
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

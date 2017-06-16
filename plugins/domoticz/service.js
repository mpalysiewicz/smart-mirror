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
            angular.forEach(config.sensorService.sensors, function(sensor) {
                promises.push($http.get(config.sensorService.address+sensor.id+'/lastValue'));
            });

            return $q.all(promises).then(function(response) {
                service.sensorList = [];
                for (var i=0; i < response.length; i++){

                    if(response[i].data.id !== undefined){
                        response[i].data.name = getSensorById(config.sensorService.sensors, response[i].data.id).name;
                        service.sensorList.push(response[i].data);
                    }
                }
            });
        }



        service.updateDomoticz = function() {
		var i = 0;
		for (var c in config.domoticz.sensors) {
			console.log("this is c: " + c);
			var sensor = config.domoticz.sensors[c];
			var url = this.config.apiBase + ":" + this.config.apiPort + "/json.htm?type=devices&rid="  + sensor.idx;
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
	}

		return service;
    }

    angular.module('SmartMirror').factory('DomoticzService', DomoticzService);
} ());

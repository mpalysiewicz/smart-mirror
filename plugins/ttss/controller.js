function tramstop($scope, $http, SpeechService, Focus) {
        var service = {};

        service.ListOfStops = function (tramstop){

            return $http
                .get("http://www.ttss.krakow.pl/internetservice/services/lookup/autocomplete/json?query=" + tramstop.charAt(0))
                .then(function(response){return service.CalculateBestIdBasedOnTtssResponse(response.data,tramstop);})
                .then(service.GetActualDepartures);
        }

        service.CalculateBestIdBasedOnTtssResponse = function(response, tramstop){
            var stops = [];
            //pierwszy zwrocony element jest nie potrzebny
            response.shift();

            let Entities = require('html-entities').AllHtmlEntities;
            var entities = new Entities();
            //zapisz nazwy przystankow bez entity
            response.forEach(function(stop){stops.push(entities.decode(stop.name))});
            console.log(stops);

            //poszukaj najlepszego przystanku
            var stringSimilarity = require('string-similarity');
            var best = stringSimilarity.findBestMatch(tramstop, stops);
            console.log(best.bestMatch.target);

            //uzycie encode ponizej jest smutne. To trzeba naprawic
            var bestId = response.filter(function(pos){return pos.name==entities.encode(best.bestMatch.target)})[0].id;
            return bestId;
        }

        service.GetActualDepartures = function(stopId){
            return $http
                .get("http://www.ttss.krakow.pl/internetservice/services/passageInfo/stopPassages/stop?stop=" + stopId+ "&mode=departure")
                .then(function(response){
                    return response.data.actual;
                });
        }

        return service;
      }

    angular.module('SmartMirror')
        .controller('TtssService', ['$http', TtssService]);

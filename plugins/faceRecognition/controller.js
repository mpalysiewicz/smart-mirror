function faceRecognition($scope, FaceRecognitionService, SpeechService) {
FaceRecognitionService.init();
            //Add person
            SpeechService.addCommand('add_person', function(name) {
                FaceRecognitionService.addPerson(name).then(function(faceId){
                });
            });

            //Remove person
            SpeechService.addCommand('remove_me', function(name) {
                FaceRecognitionService.removePerson(name).then(function(){
                });
            });

            //Remove Me
           SpeechService.addCommand('remove_me', function() {
                FaceRecognitionService.removeMe().then(function(){
                });
            });
}


angular.module('SmartMirror')
    .controller('faceRecognition', faceRecognition);


function Face($scope, FaceRecognitionService, SpeechService, AutoSleepService, $interval, Focus) {

   //refresh
    var refreshFaceRecognition = function () {
        if (AutoSleepService.woke == true) {

            console.log("Refreshing Face Recognition");

           FaceRecognitionService.recognizePerson().then(function (personName) {
               $scope.personName = personName;
           });
            //FaceRecognitionService.recognizeEmotion();
       }
    };


    refreshFaceRecognition();
    $interval(refreshFaceRecognition, config.faceRecognition.refreshInterval * 1000 || 1800000)
        //add person
    SpeechService.addCommand('add_person', function (name) {
        FaceRecognitionService.addPerson(name).then(function (faceId) {
        });
    });

    //Remove person
    SpeechService.addCommand('remove_me', function (name) {
        FaceRecognitionService.removePerson(name).then(function () {
        });
    });
    //recognize Me
    SpeechService.addCommand('recognize_me', function () {
        FaceRecognitionService.recognizePerson().then(function () {
        });
    });
    //Remove Me
    SpeechService.addCommand('remove_me', function () {
        FaceRecognitionService.removeMe().then(function () {
        });
    });
    //Hide camera
    SpeechService.addCommand('hide_camera', function () {
        Focus.change("default");
    });
    //Show camera
    SpeechService.addCommand('show_camera', function () {
        Focus.change("camera");
    });


}

angular.module('SmartMirror')
    .controller('Face', Face);

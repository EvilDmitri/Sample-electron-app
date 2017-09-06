let ipcRenderer = require('electron').ipcRenderer; 
let uuid = require('uuid');

var app = angular.module('myApp', ['ngAnimate', 'ngMaterial']);

app.directive('toggleInsertView', function() {
        return function(scope, el) {
            el.bind('click', function(e) {
                e.preventDefault();

                console.log('toggleInsertView directive!!!');
                ipcRenderer.send('toggle-insert-view');
            });
        };
    });

app.factory('Generator', function() {
	return {
		create: function() {
			return uuid.v4();
		}
	}
});



app.controller('MainCtrl', ['$scope', '$interval', function($scope, $interval) {
    // var self = this;
    // self.determinateValue = 0;

    $scope.blood_1 = 0;
    $scope.blood_2 = 0;
    var stop;

    $scope.fight = function() {
        console.log('Fight');
        // Don't start a new fight if we are already fighting
        if (angular.isDefined(stop) ) return;

        stop = $interval(function() {
            console.log($scope.blood_1);
            if($scope.blood_1 < 100 && $scope.blood_2 < 100) {
                $scope.blood_1 = $scope.blood_1 + Math.floor(Math.random() * 10);
                $scope.blood_2 = $scope.blood_2 + Math.floor(Math.random() * 10);
            }else {
                $scope.stopFight();
            }
        }, 100);
    };

    $scope.stopFight = function() {
      if (angular.isDefined(stop)) {
        $interval.cancel(stop);
        stop = undefined;
      }
    };

    $scope.resetFight = function() {
      $scope.blood_1 = 0;
      $scope.blood_2 = 0;
    };

    $scope.$on('$destroy', function() {
      // Make sure that the interval is destroyed too
      $scope.stopFight();
    });


    }]);


const moment = require('moment');

const secondsToTime = (s) => {
    let momentTime = moment.duration(s, 'seconds');
    let sec = momentTime.seconds() < 10 ? ('0' + momentTime.seconds()) : momentTime.seconds();
    let min = momentTime.minutes() < 10 ? ('0' + momentTime.minutes()) : momentTime.minutes();
    return `${min}:${sec}`;
}

// Listen to the 'timer-change' event
ipcRenderer.on('timer-change', (event, t) => {
    // Initialize time with value send with event
    let currentTime = t;

    // Print out the time
    timerDiv.innerHTML = secondsToTime(currentTime);
    console.log(secondsToTime(currentTime));

    // Execute every second
    let timer = setInterval(() => {

        // Remove one second
        currentTime = currentTime - 1;

        // Print out the time
        timerDiv.innerHTML = secondsToTime(currentTime);

        // When reaching 0. Stop.
        if (currentTime <= 0) {
            clearInterval(timer);
        }
    }, 1000); // 1 second
});

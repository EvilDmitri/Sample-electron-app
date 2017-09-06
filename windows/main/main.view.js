let ipcRenderer = require('electron').ipcRenderer; 
let uuid = require('uuid');

var app = angular.module('myApp', ['ngAnimate', 'ngMaterial', 'ngMdIcons']);

app.directive('toggleInsertView', function() {
        return function(scope, el) {
            el.bind('click', function(e) {
                e.preventDefault();
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
    

}]);


// Listen to the 'timer-change' event
ipcRenderer.on('timer-change', (event, t) => {
 
});

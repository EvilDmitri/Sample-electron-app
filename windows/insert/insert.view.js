let ipcRenderer = require('electron').ipcRenderer; 
let uuid = require('uuid');

var app = angular.module('myApp', ['ngAnimate', 'ngMaterial', 'ngMdIcons']);

app.controller('PasswordCtrl', function($scope) {
    
  })
  .config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  });

'use strict';

require('angular/angular');
require('angular-ui-router');
require('angular-cookies');
require('angucomplete-alt');

var gameApp = angular.module('gameApp', ['ui.router', 'ngCookies', "angucomplete-alt"])
    .config(function($stateProvider, $locationProvider) {
      var mainState = {
        name: 'main',
        url: '/',
        templateUrl: '../../templates/views/main.html'
      };

      var aboutState = {
        name: 'about',
        url: '/about/',
        templateUrl: '../../templates/views/about.html'
      };

      var contactState = {
        name: 'contact',
        url: '/contact/',
        templateUrl: '../../templates/views/contact.html'
      };

      var signinState = {
        name: 'signin',
        url: '/signin/',
        templateUrl: '../../templates/views/signin.html'
      };

      var signupState = {
        name: 'signup',
        url: '/signup/',
        templateUrl: '../../templates/views/signup.html'
      };

      $stateProvider.state(mainState);
      $stateProvider.state(aboutState);
      $stateProvider.state(contactState);
      $stateProvider.state(signinState);
      $stateProvider.state(signupState);


        // use the HTML5 History API
        $locationProvider.html5Mode(true);

    });

// Instantiate Router
// require('./settings/controllers/routerController.js')(gameApp);

//services
require('./services/resourceServices.js')(gameApp);
require('./services/copy')(gameApp);
require('./services/auth')(gameApp);

//controllers
require('./settings/controllers/instancesController.js')(gameApp);
require('./settings/controllers/authController.js')(gameApp);

//directives
require('./settings/directives/header_directive.js')(gameApp);
require('./settings/directives/main_directive.js')(gameApp);
require('./settings/directives/footer_directive.js')(gameApp);
require('./settings/directives/new_instance_directive.js')(gameApp);
require('./settings/directives/create_user_directive.js')(gameApp);
require('./settings/directives/sign_in_directive.js')(gameApp);
require('./settings/directives/current_games_directive.js')(gameApp);

'use strict';

module.exports = function(app) {
  app.config(function($urlRouterProvider, $stateProvider, $locationProvider, $urlMatcherFactoryProvider) {

      // Treats URLs with and without trailing slashes identically
      // [Must remain above $stateProvideres below]
      $urlMatcherFactoryProvider.strictMode(false);

      // Append trailing slash to page path if otherwise missing
      $urlRouterProvider.rule(function($injector, $location) {

        var path = $location.path();
        var noTrailingSlash = path[path.length-1] !== '/';

        if(noTrailingSlash) {

          //if last charcter is not a slash, return the same url with the slash
          var newPath = path += '/';
          return newPath;
        }

      });

      // Define routes
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


      // Apply routes to stateProvider
      $stateProvider.state(mainState);
      $stateProvider.state(aboutState);
      $stateProvider.state(contactState);
      $stateProvider.state(signinState);
      $stateProvider.state(signupState);


      // Use the HTML5 History API to remove "#" from page path
      $locationProvider.html5Mode(true);

    });
  };

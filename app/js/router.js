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
        templateUrl: '../views/main.html',
        controllerAs: 'main'
      };

      var aboutState = {
        name: 'about',
        url: '/about/',
        templateUrl: '../views/about.html'
      };

      var contactState = {
        name: 'contact',
        url: '/contact/',
        templateUrl: '../views/contact.html'
      };

      var loginState = {
        name: 'login',
        url: '/login/',
        templateUrl: '../views/login.html'
      };

      var signupState = {
        name: 'signup',
        url: '/signup/',
        templateUrl: '../views/signup.html'
      };

      var accountState = {
        name: 'account',
        url: '/account/:userId',
        templateUrl: '../views/account.html'
      };

      var instanceState = {
        name: 'instance',
        url: '/i/:instanceId',
        templateUrl: '../views/instance.html'
      };


      // Apply routes to stateProvider
      $stateProvider.state(mainState);
      $stateProvider.state(aboutState);
      $stateProvider.state(contactState);
      $stateProvider.state(loginState);
      $stateProvider.state(signupState);
      $stateProvider.state(accountState);
      $stateProvider.state(instanceState);


      // Use the HTML5 History API to remove "#" from page path
      $locationProvider.html5Mode(true);

    });
  };

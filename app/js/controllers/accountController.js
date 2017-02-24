'use strict';

module.exports = function(app) {
  app.controller('accountController', ['$rootScope', '$scope', '$state', '$stateParams', '$location', '$window', '$timeout', 'auth', function($rootScope, $scope, $location, $state, $stateParams, $window, $timeout, auth) {

    // TODO - Add Functionality

    // Log the URL params (e.g. account/{12345})
    console.log($state.userId);

  }]);
};

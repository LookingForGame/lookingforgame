'use strict';

module.exports = function(app) {
  app.controller('instanceController', ['$rootScope', '$scope', '$state', '$stateParams', '$location', '$window', '$timeout', 'auth', '$http', function($rootScope, $scope, $location, $state, $stateParams, $window, $timeout, auth, $http) {

    // Get Instance when controller loads
    getInstance($state.instanceId);

    function getInstance(instanceId) {
      $http.get('/api/instances/' + instanceId).success(function(response) {
        // In the response, we are sending all of the data for the user that is
        // currently logged in.

          $scope.instance = response.data;

          console.log('instance below');
          console.log($scope.instances);

      });
    }

  }]);
};

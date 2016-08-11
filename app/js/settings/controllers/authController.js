'use strict';

module.exports = function(app) {
  app.controller('authController', ['$scope', '$location', '$window', '$timeout', 'auth', function($scope, $location, $window, $timeout, auth) {

    if (auth.isSignedIn()) {
      // $window.location = '/'
    }
    $scope.errors = [];
    $scope.authSubmit = function(user) {
      if (user.email) { //was user.password_confirmation
        auth.create(user, function(err) {
          if (err) {
            return $scope.errors.push({
              msg: 'could not sign in'
            });
          }

          $window.location = '/'
        })
      }
    };

    $scope.login = function(user) {
        auth.signIn(user, function(err) {
          if (err) {
            return $scope.errors.push({
              msg: 'could not create user'
            });
          }

          $window.location = '/'
        });
    }
    $scope.logout = function() {
      auth.logout();
      $window.location = '/'

    }

    $scope.reloadPage = function() {
      // $timeout(function() {
      //   $window.location.reload();
      // }, 200);
    };
  }]);
};

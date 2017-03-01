'use strict';

module.exports = function(app) {
  app.controller('authController', ['$rootScope', '$scope', '$location', '$window', '$timeout', 'auth', function($rootScope, $scope, $location, $window, $timeout, auth) {

    $scope.errors = $scope.errors || [];

    if (auth.isSignedIn()) {
      // $window.location = '/'
    }

    $scope.authSubmit = function(user) {
      if (user.email) { //was user.password_confirmation
        auth.create(user, function(data, err) {
          if (data.success) {
            $scope.errorMsg = null;
            $window.location = '/';
            console.log('User successfully created');
          }
          if (!data.success) {
            $scope.errorMsg = data.msg;
            return $scope.errorMsg;
          }
          if (err != '200') {
            return $scope.errors.push({
              msg: 'could not create user'
            });
          }
        });
      }

      // Clean form and user info
      $scope.signupForm.$setPristine();
      $scope.user = {};
    };

    $scope.login = function(user) {
        if (user.username) {
          auth.signIn(user, function(data, err) {
            if (data.success) {
              $scope.errorMsg = null;
              $location.path('/');
            }
            if (!data.success) {
              $scope.errorMsg = "Invalid username or password";
              return $scope.errorMsg;
            }
            if (err != '200') {
              return $scope.errors.push({
                msg: 'could not create user'
              });
            }

          });
        }

      // Clean form and user info
      $scope.loginForm.$setPristine();
      $scope.user = {};
    };

    $scope.logout = function() {
      auth.logout();
      $window.location = '/';
    };

  }]);
};

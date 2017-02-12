'use strict';

module.exports = function(app) {
  app.controller('authController', ['$scope', '$location', '$window', '$timeout', 'auth', function($scope, $location, $window, $timeout, auth) {

    if (auth.isSignedIn()) {
      // $window.location = '/'
    }
    $scope.errors = [];
    $scope.authSubmit = function(user) {
      if (user.email) { //was user.password_confirmation
        auth.create(user, function(data, err) {
          if (data.success) {
            $scope.errorMsg = null;
            $window.location = '/'
          }
          if (!data.success) {
            $scope.errorMsg = data.msg;
            // console.log('errorMsg: ' + $scope.errorMsg)
            return $scope.errorMsg;
          }
          if (err) {
            return $scope.errors.push({
              msg: 'could not create user'
            });
          }
        })
      }
    };

    $scope.login = function(user) {
        if (user.username) {
          auth.signIn(user, function(data, err) {
            if (data.success) {
              $scope.errorMsg = null;
              $window.location = '/'
            }
            if (!data.success) {
              $scope.errorMsg = "Invalid username or password";
              // console.log('errorMsg: ' + $scope.errorMsg)
              return $scope.errorMsg;
            }
            if (err) {
              return $scope.errors.push({
                msg: 'could not create user'
              });
            }

          });
        }
    };

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

'use strict';

module.exports = function(app) {
  app.directive('signIn', function() {
    return {
      restrict: 'AC',
      templateUrl: '../views/sign_in.html'
    };
  });
};

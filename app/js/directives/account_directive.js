'use strict';

module.exports = function(app) {
  app.directive('login', function() {
    return {
      restrict: 'AC',
      templateUrl: '../views/account.html'
    };
  });
};

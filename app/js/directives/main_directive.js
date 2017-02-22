'use strict';

module.exports = function(app) {
  app.directive('main', function() {
    return {
      restrict: 'AC',
      templateUrl: '../views/main.html'
    }
  });
};

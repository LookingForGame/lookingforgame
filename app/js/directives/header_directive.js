'use strict';

module.exports = function(app) {
  app.directive('header', function() {
    return {
      restrict: 'AC',
      templateUrl: '../views/components/header.html'
    };
  });
};

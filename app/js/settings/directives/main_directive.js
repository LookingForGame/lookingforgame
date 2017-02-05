'use strict';

module.exports = function(app) {
  app.directive('main', function() {
    return {
      restrict: 'AC',
      templateUrl: './templates/views/main.html'
    }
  });
};

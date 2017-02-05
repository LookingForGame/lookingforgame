'use strict';

module.exports = function(app) {
  app.directive('footer', function() {
    return {
      restrict: 'AC',
      templateUrl: './templates/views/footer.html'
    }
  });
};

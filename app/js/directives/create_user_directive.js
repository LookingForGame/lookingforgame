'use strict';

module.exports = function(app) {
  app.directive('createUser', function() {
    return {
      restrict: 'AC',
      templateUrl: '../views/components/create_user.html'
    }
  });
};

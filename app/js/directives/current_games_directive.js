'use strict';

module.exports = function(app) {
  app.directive('currentGames', function() {
    return {
      restrict: 'AC',
      templateUrl: '../views/components/current_games.html'
    }
  });
};

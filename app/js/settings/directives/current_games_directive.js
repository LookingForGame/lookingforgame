'use strict';

module.exports = function(app) {
  app.directive('currentGames', function() {
    return {
      restrict: 'AC',
      templateUrl: './templates/views/sub_views/current_games.html'
    }
  });
};

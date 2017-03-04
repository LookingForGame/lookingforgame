'use strict';

module.exports = function(app){
	app.directive('newInstance', function(){
		return {
			restrict: 'AC',
			templateUrl: '../views/addNewGame.html',
			replace: true
		};
	});
};

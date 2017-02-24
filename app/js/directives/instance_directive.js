'use strict';

module.exports = function(app){
	app.directive('instance', function(){
		return {
			restrict: 'AC',
			templateUrl: '../views/instance.html',
			replace: true
		}
	});
};

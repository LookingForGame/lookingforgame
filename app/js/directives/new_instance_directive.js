'use strict';

module.exports = function(app){
	app.directive('instance', function(){
		return {
			restrict: 'AC',
			templateUrl: '../views/components/instance.html',
			replace: true
		}
	});
};

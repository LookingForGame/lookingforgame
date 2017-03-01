'use strict';

module.exports = function(app){
	app.directive('newInstance', function(){
		return {
			restrict: 'AC',
			templateUrl: '../views/components/new_instance_form.html',
			replace: true
		};
	});
};

(function() {
	'use strict';
	angular
	.module('app')
.directive("formDir",[function() {
return {
	
	restrict: "E",		
	templateUrl: 'js/template/templateform.html',
	link: function function_name() {
		console.log("HEEY IM IN DIRECTIVE FORM");
		
	}
}
}]);
})();
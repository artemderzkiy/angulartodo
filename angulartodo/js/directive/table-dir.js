(function() {
	'use strict';
	angular
	.module('app')
.directive("tableDir",tableDir)

	function tableDir() {
return {
	
	restrict: "E",	
link: function function_name() {
		//console.log("HEEY IM IN DIRECTIVE TABLE");
		
	},
	templateUrl: 'js/template/templatetable.html'
	
}
}
})();
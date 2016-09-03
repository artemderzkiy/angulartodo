(function() {
	'use strict';
	angular
	.module('app')
	.factory('ToDoFac', ToDoFac)
	ToDoFac.$inject=['$q','FirebaseReq','TODOURL','USERURL'];

	function ToDoFac($q,FirebaseReq,TODOURL,USERURL) {
		var vm ={};

		vm.properties ={
			todos : {},
			users : {}
		};
		vm.methods ={
			getDataByUrl: getDataByUrl
		};
		function getDataByUrl(name) {
			var url='';

			switch(name) {
				case 'todos' :
				url=TODOURL;
				break;
				case 'users' : 
				url=USERURL;
				break;
				default : 
				var deferred = $q.defer();
				deferred.reject('you gave me bad url =(((');
				return
				deferred.promise;
			}
			return FirebaseReq.getData(url)
			.then(function(response) {
				switch(name){
					case 'todos' :
					vm.properties.todos=response;
					//console.log('im in factory todos');
					break;
					case 'users' :
					vm.properties.users=response;
					//console.log('im in factory users');
					break;
				}
				return response;
			})
			.catch(function(e) {
				console.log(e);
			})
		}
return vm.methods
	}

})();
(function() {
	'use strict';

	angular
	.module('app')
	.service('FirebaseReq', FirebaseReq);
	FirebaseReq.$inject = ['$http'];
	function FirebaseReq($http) {

		this.getData=getData;

		function getData(url) {
			return $http.get(url)
			.then(function resolve(response) {
				//console.log('im in service');
				return response.data
			})
			.catch(function reject(error) {
				console.log(error);
			})
		}
	}
})()
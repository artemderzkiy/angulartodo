(function() {
'use strict';
angular 
.module('app')
.constant('TODOURL',"https://epamangular.firebaseio.com/todos.json")
.constant('USERURL',"https://epamangular.firebaseio.com/users/users.json")
})();
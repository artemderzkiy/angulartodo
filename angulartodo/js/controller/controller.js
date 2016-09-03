(function() {
	'use strict';
	angular
	.module('app')
	.controller("toDoCtrl",toDoCtrl);
	toDoCtrl.$inject = ['$http','$scope','ToDoFac'];


//grab info from firebase and slice it to 5 items
function toDoCtrl($http,$scope, ToDoFac) {
	let i = 0;
	let j=10;
	$scope.end=false;
	$scope.requiredCom = false;
	$scope.sortType     = 'name';
	$scope.sortReverse  = false;
	$scope.textClass = '';  
	$scope.model = {		
		selected: {},
		currentItem: undefined,
		name : "",
	};

	$scope.todoHttp = function() {
		ToDoFac.getDataByUrl('users')
		.then(function(response) {
		//console.log('im in new metod users');
		$scope.model.users=response;
		
	})
		.catch(function(e) {
			console.log(e);
		})
		ToDoFac.getDataByUrl('todos')
		.then(function(response) {
		//console.log('im in new method todos in 5');
		$scope.model.todos=response.slice(0,5);
	})
		.catch(function(e) {
			console.log(e);
		})	
	}

	$scope.todoHttp();


//show more button metod
$scope.showMore = function() {
	ToDoFac.getDataByUrl('todos')
	.then(function(response) {
		//console.log('im in new method todos in 5');
		$scope.model.todos=response.slice(i,j);
		if (j>=response.length)
		{
			$scope.end =true;
			return $scope.end
		}
		j=j+5;
	})
	.catch(function(e) {
		console.log(e);
	})	
}


// //show more button metod OLD
// $scope.showMore = function() {
// 	$http.get("https://epamangular.firebaseio.com/todos.json")
//     .then(function(response) {
//     	//console.log(i)
//         $scope.model.todos = response.data.slice(i,j);
//          if (j>=response.data.length)
//         {
//         	$scope.end =true;
//         	return $scope.end
//         }
//         j=j+5;

//         });
// }

// //grab info from firebase and slice it to 5 items OLD
// $scope.todoHttp = $http.get("https://epamangular.firebaseio.com/todos.json")
//     .then(function(response) {

//         $scope.model.todos = response.data.slice(0,5);
//         //console.log(response.data)
// });

//  $http.get("https://epamangular.firebaseio.com/users/users.json")
//     .then(function(response) {
//         $scope.model.users = response.data;
//      //  console.log($scope.model.users)
// });


//name class to color the item
$scope.fullTimeClass = function(name) {
	$scope.textClass = name;

};

//method to remove item
$scope.remove = function (todo) {
	var ans = confirm("Are you sure?");
	if (ans==true) {
		var comArr = $scope.model.todos;
		for (var i = 0; i < comArr.length; i++) {
			if (comArr[i] === todo) {
				var index = i;
				break;
			}
		}   
		$scope.model.todos.splice(index, 1);

		$http.put("https://epamangular.firebaseio.com/todos.json",  $scope.model.todos );
    //.then(function(response) {
     // response.data=  $scope.model.todos;
        //console.log(response.data)
//});

$scope.reset()
}    
};

//method to add item , to choose selected item
$scope.add = function () {
	$scope.model.selected = {};


}
//method for editing and adding item, works with selected and current item if they were chosen
$scope.save = function () {
	console.log("Saving item");    


	if($scope.model.currentItem != undefined)
	{
		$scope.model.currentItem.name = $scope.model.selected.name;
		$scope.model.currentItem.nameUser = $scope.model.selected.nameUser;
		$scope.model.currentItem.date = $scope.model.selected.date;
		$scope.model.currentItem.foolday = $scope.model.selected.foolday;
		$scope.model.currentItem.comment = $scope.model.selected.comment;
		$http.put("https://epamangular.firebaseio.com/todos.json",  $scope.model.todos );
		$scope.reset();


	}
	else
	{
		$scope.model.todos.push($scope.model.selected);
		$scope.fullTimeClass($scope.model.selected.foolday);
		$http.put("https://epamangular.firebaseio.com/todos.json",  $scope.model.todos );
		$scope.reset();
	}
	$scope.showme=false;
	$scope.end=false;
};
//to reset model after editing f.e.
$scope.reset = function () {	
	$scope.model.selected = {};
	$scope.model.name="";
	$scope.model.currentItem=undefined;

};
//to paste model to view via editing
$scope.edit = function (item) {
	$scope.showme=true;    
	$scope.model.selected = angular.copy(item);
	$scope.model.currentItem = item;

};
}

})()






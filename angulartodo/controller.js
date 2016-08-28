angular.module("app",[])



.controller("toDoCtrl",	function($scope, $http) {
//var url= "https://epamangular.firebaseio.com/todos";
//var fireRef = new Firebase(url);

//var syncObject= $firebaseObject(fireRef);
//syncObject.$bindTo($scope, "todos");
var i = 0;
var j=10;
$scope.end=false;
$scope.requiredCom = false;

$scope.showMore = function() {
	$http.get("https://epamangular.firebaseio.com/todos.json")
    .then(function(response) {
    	//console.log(i)
        $scope.model.todos = response.data.slice(i,j);
         if (j>=response.data.length)
        {
        	$scope.end =true;
        	return $scope.end
        }
        j=j+5;

        });
}

$scope.todoHttp = $http.get("https://epamangular.firebaseio.com/todos.json")
    .then(function(response) {

        $scope.model.todos = response.data.slice(0,5);
        console.log(response.data)
});

 $http.get("https://epamangular.firebaseio.com/users/users.json")
    .then(function(response) {

        $scope.model.users = response.data;
       console.log($scope.model.users)
});

	$scope.sortType     = 'name';
    $scope.sortReverse  = false;
    $scope.textClass = '';  
	$scope.model = {		
		selected: {},
		currentItem: undefined,
		name : "",

	};




$scope.fullTimeClass = function(name) {
$scope.textClass = name;

};

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


	$scope.add = function () {
		$scope.model.selected = {};


}

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

$scope.reset = function () {	
	$scope.model.selected = {};
	$scope.model.name="";
	$scope.model.currentItem=undefined;

};

$scope.edit = function (item) {
	$scope.showme=true;    
	$scope.model.selected = angular.copy(item);
	$scope.model.currentItem = item;

};




}).

directive("tableDir",[function() {
return {
	
	restrict: "E",	

	templateUrl: '/templatetable.html',
	link: function function_name() {
		console.log("HEEY IM IN DIRECTIVE TABLE");
		
	}
}
}]).

directive("formDir",[function() {
return {
	
	restrict: "E",		
	templateUrl: '/templateform.html',
	link: function function_name() {
		console.log("HEEY IM IN DIRECTIVE FORM");
		
	}
}
}]);


var app=angular.module("app",['firebase']);
app.controller("toDoCtrl",function($scope) {
var url= "https://epamangular.firebaseio.com/todos";
//var fireRef = new Firebase(url);

//$scope.todos = $firebaseArray(fireRef);

	$scope.sortType     = 'name';
    $scope.sortReverse  = false;
    $scope.textClass = '';  
	$scope.model = {
		todos: [
		{'name':"go",'date':'11.08.2016','foolday':'false'},
		{'name':"run",'date':'11.08.2016','foolday':'false'},
		{'name':"sleep",'date':'11.08.2016', 'foolday':'true'},		
		],
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
		$scope.model.currentItem.date = $scope.model.selected.date;
		$scope.model.currentItem.foolday = $scope.model.selected.foolday;

		$scope.reset();

	}
	else
	{
		$scope.model.todos.push($scope.model.selected);
		$scope.fullTimeClass('fulltime');
		$scope.reset();
	}
	$scope.showme=false;
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




})
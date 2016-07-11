var app = angular.module("MarvelHeroesApp",['angular-md5']);
var url2 ="";
app.controller("MarvelHeroesController", ["$scope","$http","md5", function($scope, $http, md5){
	// $scope.hero = "Jean Diaz";
	// $scope.newHero = {};
	// $scope.heroName = "";
	// $scope.heroes = [
	// 	{
	// 		name: "Spider-man",
	// 		superpower: "It's like a spider but <b>human</b>"
	// 	},
	// 	{
	// 		name: "Super-man",
	// 		superpower: "It's like a man but <b>super</b>"
	// 	}
	// ];
	$scope.addHeroe = function (){
		$scope.heroes.push($scope.newHero);
		// if you don't reinitialize your variable it dont drop the binding
		$scope.newHero = {};
	};
	// var api = "7af24e68aa481da4009d0b734ac9626d";
	// var url = "http://gateway.marvel.com:80/v1/public/characters?name=s&apikey=";
	// url += api;
	var url = "https://jsonplaceholder.typicode.com/posts"

	$scope.searchHero = function(){
		var publicKey = "7af24e68aa481da4009d0b734ac9626d";
		var privateKey = "25f19afb3830587d5f04e3d55f4e53c3fb1de299";
		var ts = (+new Date);
		var hash = md5.createHash(ts + privateKey + publicKey);
		url2 = "https://gateway.marvel.com/v1/public/"
		url2 += "characters?";
		url2 += "nameStartsWith=" + $scope.heroName;
		url2 += "&apikey=" + publicKey;
		url2 += "&hash="+ hash;
		url2 += "&ts="+ ts;
		url2 += "&limit=20"
		$http.get(url2)
			.success(function(data) {
				window.data = data;
				console.log(data);
				$scope.list = data.data.results;
			})
			.error(function (err) {
				console.log(err);
			});
	};		
}]);
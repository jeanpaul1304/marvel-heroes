var app = angular.module("MarvelHeroesApp",['angular-md5','angular-loading-bar']);
var url2 ="";
app.controller("MarvelHeroesController", ["$scope","$http","md5", "cfpLoadingBar", function($scope, $http, md5, loadingBar){
	$scope.addHeroe = function (){
		$scope.heroes.push($scope.newHero);
		// if you don't reinitialize your variable it dont drop the binding
		$scope.newHero = {};
	};
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
		window.loader = loadingBar;
		loadingBar.start();
		$http.get(url2)
			.success(function(data) {
				window.data = data;
				console.log(data);
				if (data.data.results.length > 0 ) {
					$scope.list = data.data.results;
				}else{
					var obj = {}
					obj = errorMsg("Nay!", "No se han encontrado resultados, intentelo nuevamente.");
					$scope.list = [];
					$scope.list.push(obj); 
				}
				loadingBar.complete();
			})
			.error(function (err) {
				obj = errorMsg("Ops!", "Ha ocurrido un error, vuelva a intentarlo.");
				loadingBar.complete();
			});
		var errorMsg = function (title, body) {
			var obj = {}
			obj.name = title;
			obj.body = body;
			obj.thumbnail = {};
			obj.thumbnail.path = "http://jokideo.com/wp-content/uploads/meme/2014/06/Reaction-pic---Sad-baby-face";
			obj.thumbnail.extension = "jpg";
			return obj;
		}
	};	
	loadingBar.complete();
}]);
var app = angular.module('marvelSearch', ['ngRoute','ui.bootstrap']);


app.controller('MainCtrl', function($scope, $location, $http) {
  $scope.char={};
  $scope.showCharInfo= false;
  $scope.showCharDetails=false;
  $scope.char.thumb="";
  $scope.modalShown = false
  $scope.listComics = [];


  // $http.get("/api/tokenMarvel").then(function (response) {
  //   console.log(response)
  // })

  $scope.getCharacters = function(val) {
        $scope.timeStamp=   "codekey";
        $scope.publicKey=  "5a237863b3cc2061003cbbc4fe20dc06";
        $scope.mdhash= "44f77efb35ecc5e549a07ffbb7cc4063"
        baseUrl= "https://gateway.marvel.com/v1/public/characters";
    return $http.get(baseUrl, {
      params: {
        nameStartsWith: val,
        limit: 25,
        ts: $scope.timeStamp,
        apikey: $scope.publicKey,
        hash: $scope.mdhash
      }
    }).then(function(response){
      $scope.charInfoArr=response.data.data.results;
      return response.data.data.results.map(function(item){
        $scope.idCharacter=item.id
        
        return item.name;
      });
    });
  };

  $scope.clearField= function (){
    $scope.showCharInfo= false;
  }

  $scope.selectCharacter=function (item){
    angular.forEach($scope.charInfoArr, function(obj, key){
      if(obj.name===item){
      
         if (obj.thumbnail){
           $scope.char.thumb= obj.thumbnail.path+"."+obj.thumbnail.extension;

         }else{
           $scope.char.thumb="";
         }

         $scope.char.name= obj.name;
         $scope.char.desc= obj.description;
         $scope.char.comics=obj.comics.items;

         for (let index = 0; index < $scope.char.comics.length; index++) {
          $scope.listComics.push($scope.char.comics[index]);
         }

         $scope.showCharInfo= true;
      }
 
    })
  }


});
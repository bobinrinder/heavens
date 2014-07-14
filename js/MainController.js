(function () {

  'use strict';

  /* @ngInject */
  function MainController ($scope, ParseService) {

    $scope.selected = [];
    $scope.burger = {};

    ParseService.createBurger(function(id){
      $scope.burger.id = id;
      $scope.burger.value = id;
    });

    $scope.update = function(item, isAdded){
      if(isAdded){
        $scope.selected.push(item);
        ParseService.addIngredientToBurger($scope.burger.id, item.id);
      } else {


        for (var i = $scope.selected.length - 1; i >= 0; i--) {
          if($scope.selected[i].id === item.id){
            console.log($scope.selected.splice(i, 1));
            break;
          }
        }

        //console.log(item.id, $scope.selected, _.indexOf($scope.selected, item.id));
      }
    };

    $scope.save = function(){
      ParseService.setBurgerName($scope.burger.id ,$scope.burger.value);
    };


    ParseService.getAllIngredients(

      function(results) {
        console.log(results[0].attributes.description );
        $scope.$apply(function(){
          $scope.ingredients = results;
        });
      },

      function(error) {
        console.log(error);
      }

    );

  }
  
  MainController.$inject = ['$scope', 'ParseService'];

  angular
    .module('app')
    .controller('MainController', MainController);

})();
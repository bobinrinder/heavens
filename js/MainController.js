(function () {

  'use strict';

  /* @ngInject */
  function MainController ($scope, ParseService) {

    $scope.selected = [];

    $scope.update = function(item, isActive){
      if(isActive){
        $scope.selected.push(item);
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
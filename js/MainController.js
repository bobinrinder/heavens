(function () {

  'use strict';

  /* @ngInject */
  function MainController ($scope, ParseService) {
    
    ParseService.getIngredients(

      function(results) {
        console.log(results[0].attributes.description);
        $scope.ingredients = results[0].attributes.description;
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
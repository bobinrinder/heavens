(function () {

  'use strict';

  /* @ngInject */
  function MainController ($scope, ParseService) {
    
    $scope.hello = "Hello World";




  }
  
  MainController.$inject = ['$scope', 'ParseService'];

  angular
    .module('app')
    .controller('MainController', MainController);

})();
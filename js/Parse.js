(function () {

  'use strict';

  var ParseService = function($window) {

    Parse.initialize("iaN6uDqJpyyt1HO6TDZCGGGW2N5IwIS3dAuYLE2g", "5uKLDfghmE5RDlPpgQ8hSKJZULBnc3TpeJEIdIM6");

    var getSomething = function() {
      return "Hallo";
    };

    return {
      getSomething: getSomething
    };
  };

  
  // MainController.$inject = ['$scope', 'Parse'];

  angular
    .module('app')
    .service('ParseService', ParseService);

})();
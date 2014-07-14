(function () {

  'use strict';

  var order = function() {

    return function(array) {

      return array.sort(sortfunction);

    };

    function sortfunction(a, b){
      return b.attributes.position - a.attributes.position;
    }
    
    
  };

  


  // MainController.$inject = ['$scope', 'Parse'];

  angular
    .module('app')
    .filter('orderShit', order);

})();
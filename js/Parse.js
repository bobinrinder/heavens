(function () {

  'use strict';

  var ParseService = function($window) {

    Parse.initialize("iaN6uDqJpyyt1HO6TDZCGGGW2N5IwIS3dAuYLE2g", "5uKLDfghmE5RDlPpgQ8hSKJZULBnc3TpeJEIdIM6");

    var HeavensObject = Parse.Object.extend("heavens");

    var getIngredients = function(successHandler, errorHandler) {
      var query = new Parse.Query(HeavensObject);
      query.equalTo("minimum", 0);
      query.find({
        success: successHandler,
        error: errorHandler
      });
    };

    return {
      getIngredients: getIngredients
    };
  };

  
  // MainController.$inject = ['$scope', 'Parse'];

  angular
    .module('app')
    .service('ParseService', ParseService);

})();
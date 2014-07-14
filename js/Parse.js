(function () {

  'use strict';

  var ParseService = function($window) {

    Parse.initialize("iaN6uDqJpyyt1HO6TDZCGGGW2N5IwIS3dAuYLE2g", "5uKLDfghmE5RDlPpgQ8hSKJZULBnc3TpeJEIdIM6");

    var getAllIngredients = function(successHandler, errorHandler) {
      var HeavensObject = Parse.Object.extend("heavens");
      var query = new Parse.Query(HeavensObject);
      query.equalTo("minimum", 0);
      query.find({
        success: successHandler,
        error: errorHandler
      });
    };

    var createBurger = function(successHandler, errorHandler) {
      var HeavensBurgerObject = Parse.Object.extend("heavensBurger");
      var heavensBurgerObject = new HeavensBurgerObject();
      heavensBurgerObject.save({}, {
      success: function(object) {
        successHandler(object.id);
      },
      error: errorHandler
      });
    };

    var setBurgerName = function(objectId, burgerName) {
      var HeavensBurgerObject = Parse.Object.extend("heavensBurger");
      var query = new Parse.Query(HeavensBurgerObject);
      query.equalTo("objectId", objectId);
      query.first({
        success: function(object) {
           object.set("name", burgerName);
           object.save();
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
    };

    var addIngredient = function(pBurgerId, pIngredientId) {
      var BurgerIngredientsObject = Parse.Object.extend("BurgerIngredients");
      var burgerIngredients = new BurgerIngredientsObject();
      burgerIngredients.save({burgerId: pBurgerId, ingredientId: pIngredientId}, {
        success: function(object) {
           alert(object.objectId);
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
    };

    setBurgerName("0bTXcURGuZ", "Teschd");
    addIngredient("0bTXcURGuZ","9CuxYpX9Cn");

    return {
      getIngredients: getIngredients
    };
  };

  


  // MainController.$inject = ['$scope', 'Parse'];

  angular
    .module('app')
    .service('ParseService', ParseService);

})();
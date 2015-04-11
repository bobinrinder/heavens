angular.module('heavens', [])

	.controller('ingredientCtrl', function($scope){
		$scope.ingredients = [
			{ name: 'Sesame', max: 1, price: 1.49, img: './img/sesam.gif', thumb: './img/sesam_th.png', orderValue: 10000, marginTop: 0, marginBottom: 0, zIndex: 4 },
			{ name: 'Tomato', max: 2, price: 0.79, img: './img/tomate.gif', thumb: './img/tomate_th.png', orderValue: 7000, marginTop: -3, marginBottom: 0, zIndex: 1 },
			{ name: 'Salad', max: 3, price: 0.99, img: './img/salat.gif', thumb: './img/salat_th.png', orderValue: 6000, marginTop: -10, marginBottom: -10, zIndex: 5 },
			{ name: 'Chicken', max: 3, price: 2.99, img: './img/chicken.gif', thumb: './img/chicken_th.png', orderValue: 5000, marginTop: -5, marginBottom: -9, zIndex: 3 },
			{ name: 'Cheddar', max: 1, price: 0.99, img: './img/cheddar.gif', thumb: './img/cheddar_th.png', orderValue: 5100, marginTop: 0, marginBottom: -12, zIndex: 7 }
		];
		$scope.burger = [];
		$scope.burgerPrice = 0;
		$scope.preloadImageSrcArray = [];
		$scope.preloadImageArray = [];

		// Preload function for the images
		$scope.preloadImages = function(imageArray) {
			for (var i = 0; i < imageArray.length; i++) {
				$scope.preloadImageArray[i] = new Image();
				$scope.preloadImageArray[i].src = imageArray[i];
      		}
  		};

		// Preload the ingredient images to make it smooth
		for (var i = 0; i < $scope.ingredients.length; i++) {
			$scope.preloadImageSrcArray.push($scope.ingredients[i].img);
		}
		$scope.preloadImages($scope.preloadImageSrcArray);

		// Checks if the maximum amount of ingredients (as defined in ingredient.max) is reached, returns true if it is reached
		$scope.checkMaxIngredientAmount = function(ingredientId) {
			// Set up a counter var
			var ingredientAmountOnBurger = 0;
			// Go through all ingredients on the burger
			for(var i = 0; i < $scope.burger.length; i++){
				if (angular.equals($scope.burger[i].name, $scope.ingredients[ingredientId].name)) {
					// Count the searched ingredient
					ingredientAmountOnBurger++;
					// Exit early if maximum amount for the ingredient is reached
					if (ingredientAmountOnBurger === $scope.ingredients[ingredientId].max) {
						return true;
					}
				}
			}
			// No maximum reached -> Further ingredient can be added
			return false;
		};

		// Gets the total price of the burger (selected ingredients)
		$scope.getBurgerPrice = function() {
			$scope.burgerPrice = 0;
			for(var i = 0; i < $scope.burger.length; i++) {
				$scope.burgerPrice += $scope.burger[i].price;
				$scope.burgerPrice = Math.round($scope.burgerPrice * 100) / 100;
			}
			return $scope.burgerPrice;
		};

		// Function updates the burger price manually
		$scope.updateBurgerPrice = function() {
			$( "#burgerprice" ).text("$" + $scope.getBurgerPrice());
		};

		// Adds a new ingredient to the burger if maximum not reached
		$scope.addIngredient = function(ingredientId) {
			if ($scope.checkMaxIngredientAmount(ingredientId)) {
				// The maximum for this ingredient is already reached
				return false;
			}
				// Actually add the ingredient as the maximum is not reached yet
			else {
				$scope.$apply($scope.burger.push($scope.ingredients[ingredientId]));
				// Push the bottom part in the array as well if it's a bread (orderValue = 10000)
				if ($scope.ingredients[ingredientId].orderValue === 10000) {
					var burgerBottomImg = $scope.ingredients[ingredientId].img.substring(0, $scope.ingredients[ingredientId].img.length - 4) + '_b.gif';
					$scope.$apply($scope.burger.push({ name: $scope.ingredients[ingredientId].name , max: 1, price: 0, img: $scope.ingredients[ingredientId].img.substring(0, $scope.ingredients[ingredientId].img.length - 4) + '_b.gif', thumb: './img/sesam_th.png', orderValue: 1000, marginTop: 0, marginBottom: 0, zIndex: 4 }));
				}
				// If maximum is reached after adding, disable draggable and grey out element
				if ($scope.checkMaxIngredientAmount(ingredientId)) {
					$scope.changeIngredientStatus(ingredientId, false);
				}
				// Update the price tag
				$scope.updateBurgerPrice();
				// Logging for debugging
				console.log("Ingredient " + $scope.ingredients[ingredientId].name + " added to Burger! --> Burger price now: " + $scope.getBurgerPrice());
				return true;
			}	
		};

		// Change active status of an ingredient (if max is reached) and set the button inactive/active
		$scope.changeIngredientStatus = function(ingredientId, ingredientAvailability) {
			// Ingredient is available
			if (ingredientAvailability) {
				$("span[index='" + ingredientId + "']").switchClass("ingredientDeactivated", "ingredientAcc ng-binding ui-draggable ui-draggable-handle ui-droppable");
				$("div[indexf='" + ingredientId + "']").removeClass("ingredientFrameDeactivated");
				$("img[indexi='" + ingredientId + "']").removeClass("ingredientImageDeactivated");					
				$("span[index='" + ingredientId + "']").draggable("enable");
			}
			// Ingredient is not available (because max ingredient is reached)
			else {
				$("span[index='" + ingredientId + "']").switchClass("ingredientAcc ng-binding ui-draggable ui-draggable-handle ui-droppable", "ingredientDeactivated");
				$("div[indexf='" + ingredientId + "']").addClass("ingredientFrameDeactivated");
				$("img[indexi='" + ingredientId + "']").addClass("ingredientImageDeactivated");	
				$("span[index='" + ingredientId + "']").draggable({ disabled: true });
			}
		};

		// Returns the index of the first given ingredient on the burger
		$scope.getBurgerIngredientIndex = function (ingredientId) {
			for(var i = 0; i < $scope.burger.length; i++){
				if ($scope.burger[i].name === $scope.ingredients[ingredientId].name) {
					return i;
				}
			}
			return -1;
		};

		// Returns the index of the burger bottom on the burger
		$scope.getBurgerBottomIngredientIndex = function (ingredientId) {
			for(var i = 0; i < $scope.burger.length; i++){
				if ($scope.burger[i].img === $scope.ingredients[ingredientId].img.substring(0,$scope.ingredients[ingredientId].img.length-4) + "_b.gif") {
					return i;
				}
			}
			return -1;
		};

		// Remove an existing ingredient from the burger
		$scope.removeIngredient = function(ingredientId) {
			// Gets the index of the ingredient in the burger array
			var ingredientIndex = $scope.getBurgerIngredientIndex(ingredientId);
			// If the ingredient was found it will be deleted of the burger array
			if (ingredientIndex > -1) {
				// Delete the ingredient
				$scope.$apply($scope.burger.splice(ingredientIndex, 1));
				// Delete the bottom part of the burger if it was a bread
				if ($scope.ingredients[ingredientId].orderValue === 10000) {
					$scope.$apply($scope.burger.splice($scope.getBurgerBottomIngredientIndex(ingredientId),1));
				}
				// Make the ingredient available again (as it is -1 from the max now at least)
				$scope.changeIngredientStatus(ingredientId, true);
				// Update the price tag
				$scope.updateBurgerPrice();
				// Some debug loggin
				console.log("Ingredient " + $scope.ingredients[ingredientId].name + " removed from Burger! --> Burger price now: " + $scope.getBurgerPrice());
				// Everything fine...
				return true;
			}
			return false;
		};

		// Prepare removal of dragged ingredient from the burger
		$scope.prepareIngredientRemoval = function(scope, ui) {
			for(var i = 0; i < scope.ingredients.length; i++){
				// Extract normal image tag
				var burgerImg = ui.draggable[0].innerHTML.substring(10,ui.draggable[0].innerHTML.length-2);
				// Change normal image tag to identify bread bottoms (they end on _b.gif)
				var burgerImgBotton = ui.draggable[0].innerHTML.substring(10,ui.draggable[0].innerHTML.length-2).replace("_b","");
				// Compare to both image tags
				if(scope.ingredients[i].img === burgerImg || scope.ingredients[i].img === burgerImgBotton){
					// After finding the correct ingredient it gets deleted of the burger
					scope.removeIngredient(i);
					return true;
				}
			}
			return false;
		};

		// Delete all ingredients from the burger
		$scope.removeAllIngredients = function() {
			// Empty the burger array
			$scope.$apply($scope.burger = []);
			// Make all ingredients available again
			for (var i = 0; i < $scope.ingredients.length; i++) {
				$scope.changeIngredientStatus(i, true);
			}
			// Update the price tag
			$scope.updateBurgerPrice();
			return true;
		};
	})

	// Directive adds draggable function to the ingredients and droppable function to the ingredient area
	.directive('draggableelm', function() {
  		return function(scope, element, attr) {
  			// Define the details of the draggable ingredients
			element.draggable({
				// Pointer looks nicer :)
				cursor: 'pointer',
				// Revert invalid means it slides back to its position if not dropped in allowed dropping area
				revert: 'invalid',
				// Makes the text gets an image once dragging started
				helper: function() {
					return $(this).html("<img src='" + scope.ingredient.img + "' />").clone();
				},
				// Ensures that the element in the ingredient list stays text (not the image defined in the previous line)
				start: function(event, ui) {
					$(this).html("&nbsp; <img indexi='" + ui.helper[0].attributes[2].value + "' src='" + scope.ingredient.thumb + "' /> &nbsp; <strong>" + scope.ingredient.name + "</strong> | $"  + scope.ingredient.price);
				}
			});
			// Define the details of elements that are dropped in this area
			element.droppable({
				drop: function(event, ui) {		
					scope.prepareIngredientRemoval(scope, ui);
				}
			});
		};
	})

	// Directive of the created burger area
	.directive('burgerdir', function() {
		return function(scope, element, attr) {
			// Set area to accept dragged elements
			element.droppable({
				accept: ".ingredientAcc",
				drop: function(event, ui) {
					// Add dragged ingredient to burger by getting the ingredientId  ui.draggable[0].attributes[2].value
					scope.addIngredient(ui.draggable.context.outerHTML.substring(ui.draggable.context.outerHTML.search("index=")+7,ui.draggable.context.outerHTML.search("index=")+8));
					// Make new created ingredient of bruger draggable itself
					$( ".draggableelm2" ).draggable({ helper: 'clone', cursor: 'pointer', revert: 'invalid' });
				}
			});
		};
	})

	// Directive of the trash bin area
	.directive('trash', function() {
		return function(scope, element, attr) {
			element.droppable({
				hoverClass: 'fa-5x',
				drop: function(event, ui) {
					// Remove dragged ingredient from the burger
					scope.prepareIngredientRemoval(scope, ui);
				}
			});
		};
	})

	// Directive for displaying an alert that the maximum ingredient amount is reached (on ingredient rollover)
	.directive('deactivateddir', function() {
		return {
			link: function(scope, element, attr) {
				// Make the alert visible on mouseenter (if maximum is reached)
				element.parent().bind('mouseenter', function() {
					if (scope.checkMaxIngredientAmount(element.context.outerHTML.substring(element.context.outerHTML.search("index=")+7,element.context.outerHTML.search("index=")+8))) {
						$( "#alertFrame" ).css("visibility", "visible");
					}		                
				});
				// Hide the alert again after mouseleave
				element.parent().bind('mouseleave', function() {
					if (scope.checkMaxIngredientAmount(element.context.outerHTML.substring(element.context.outerHTML.search("index=")+7,element.context.outerHTML.search("index=")+8))) {
						$( "#alertFrame" ).css("visibility", "hidden");
					}
				});
			}
		};
	})
// Here we create an Angular service that we will use for our
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {
  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes)
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details

    var apiKey = "H9n1zb6es492fj87OxDtZM9s5sb29rW3";

    // Dish to be shown in dish details
    var detailedDish = null;

    // menu[0] == starter, menu[1] == main course, menu[2] == dessert
    var menu = [];
    var dishes = [];

    // The number of guests


    this.getCookieNumGuests = function() {
      if ($cookieStore.get("numGuests")) {
        return $cookieStore.get("numGuests");
      }
      else return 1;
    }
    var numberOfGuests = this.getCookieNumGuests();

    this.getDetailedDish = function() {
      return detailedDish;
    }

    this.setDetailedDish = function(dish) {
      detailedDish = dish;
    }
  	this.setNumberOfGuests = function(num) {
  		numberOfGuests = num;
      $cookieStore.put("numGuests", num);
  	}

  	// Return number of guests
  	this.getNumberOfGuests = function() {
      return numberOfGuests;
  	}

  	//Returns the dish that is on the menu for selected type
  	this.getSelectedDish = function(type) {
  		return menu[type];
  	}
  	//Returns all the dishes on the menu.
  	this.getFullMenu = function() {
      return menu;
  	}
  	//Returns all ingredients for all the dishes on the menu.
  	this.getAllIngredients = function() {
      var rIngredients = [];
      for (var i = 0; i < menu.length; i++) {
        if (menu[i] != null) {
          for (var j = 0; j < menu[i].ingredients.length; j++) {
            rIngredients.push(menu[i].ingredients[j]);
          }
        }
      }
  	}

  	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
  	this.getTotalMenuPrice = function() {
  		var totPrice = 0;
      for (var i = 0; i < menu.length; i++) {
        if (menu[i] != null) {
          totPrice += this.getDishPrice(menu[i]);
        }
      }
      return totPrice;
  	}

  	//Removes dish from menu
  	this.removeDishFromMenu = function(id) {
      for (var i = 0; i < menu.length; i++) {
        if (menu[i] != null) {
          if (menu[i].RecipeID == id) {
            menu.splice(i, 1);
          }
        }
      }
      // Remove the last cookie element (which is invalid when we have spliced)
      $cookieStore.remove("d"+menu.length);
      $cookieStore.put("numDishes", menu.length);
      // Update cookie values
      for (var i = 0; i < menu.length; i++) {
        console.log("d"+i);
        $cookieStore.put("d"+i, menu[i].RecipeID);
      }

  	}
    this.addDishToMenu = function(dish) {
      var existingDishIndex = -1;
      for (var i = 0; i < menu.length; i++) {
        if (menu[i].Category == dish.Category) {
          console.log("Same category!");
          console.log(menu[i].Title + " category: "+menu[i].Category);
          console.log(dish.Title + " category: "+dish.Category);
          existingDishIndex = i;
        }
      }
      if (existingDishIndex != -1) {
        menu[existingDishIndex] = dish;

        // Change cookie value for the dish
        $cookieStore.put(("d"+existingDishIndex), dish.RecipeID);
      }
      else  {
        menu.push(dish);

        // Update length of menu to the new length, and insert the dish
        $cookieStore.put("numDishes", menu.length);
        $cookieStore.put(("d"+(menu.length - 1)),dish.RecipeID);
      }

    }
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:apiKey});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:apiKey});
    // Returns the total price for the dish
  this.getDishPrice = function(dish) {
    var price = 0;
    for (var i = 0; i < dish.Ingredients.length; i++) {
      price += dish.Ingredients[i].MetricQuantity;
    }
    price = price * numberOfGuests;
    return price;
  }
  this.initCookieMenu = function() {
    if ($cookieStore.get("numDishes")) {
      var numDishes = $cookieStore.get("numDishes");
      for (var i = 0; i < numDishes; i++) {
        menu.push(this.Dish.get({id:$cookieStore.get("d"+i)}));
      }
    }
  }
  this.initCookieMenu();
  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});

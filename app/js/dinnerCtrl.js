// Dinner controller that we use whenever we have view that needs to
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();
  $scope.menu = Dinner.getFullMenu();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }
  $scope.getDishPrice = function(dish) {
    return Dinner.getDishPrice(dish);
  }
  $scope.removeDishFromMenu = function(dish) {
    Dinner.removeDishFromMenu(dish.RecipeID);
  }
  $scope.getDetailedDish = function() {
    return Dinner.getDetailedDish();
  }
  $scope.getDetailedDishPrice = function() {
    var detailedDish = Dinner.getDetailedDish();
    if (detailedDish == null) {
      return 0;
    }
    else return Dinner.getDishPrice(detailedDish);
  }
  $scope.getTotalMenuPrice = function() {
    return Dinner.getTotalMenuPrice();
  }
  $scope.clearDetailedDish = function() {
    Dinner.setDetailedDish(null);
  }
  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});

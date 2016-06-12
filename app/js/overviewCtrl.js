dinnerPlannerApp.controller('OverviewCtrl', function ($scope,Dinner) {
  $scope.menu = Dinner.getFullMenu();

  // Get number of guests
  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }
  $scope.getTotalMenuPrice = function() {
    return Dinner.getTotalMenuPrice();
  }
  $scope.getDishPrice = function(dish) {
    return Dinner.getDishPrice(dish);
  }
});

// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  $scope.loadDish = function() {
     $scope.status = "Loading...";
     Dinner.Dish.get({id:$routeParams.dishId},function(data){
       $scope.dish=data;

       // Set the selected dish
       Dinner.setDetailedDish(data);
       $scope.status = "";
     },function(data){
       $scope.status = "There was an error";
     });
   }
   $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }
  $scope.getDishPrice = function(dish) {
    return Dinner.getDishPrice(dish);
  }
  $scope.confirmDish = function(dish) {
    Dinner.addDishToMenu(dish);
    Dinner.setDetailedDish(null);
  }
  $scope.clearDish = function() {
    Dinner.setDetailedDish(null);
  }
  $scope.loadDish();


});

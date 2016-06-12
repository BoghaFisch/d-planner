// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope,Dinner) {

  // TODO in Lab 5: you will need to implement a method that searchers for dishes
  // including the case while the search is still running.

  // Get some initial results
  $scope.status = "Searching..";
  Dinner.DishSearch.get(function(data){
    $scope.dishes=data.Results;
    $scope.status = "Showing " + data.Results.length + " results";
  },function(data){
    $scope.status = "There was an error";
  });
  // If we search
  $scope.search = function(query) {
     $scope.status = "Searching...";
     if (query == "") {
       Dinner.DishSearch.get(function(data){
         $scope.dishes=data.Results;
         $scope.status = "Showing " + data.Results.length + " results";
       },function(data){
         $scope.status = "There was an error";
       });
     }
     else {
       Dinner.DishSearch.get({title_kw:query},function(data){
         $scope.dishes=data.Results;
         $scope.status = "Showing " + data.Results.length + " results";
       },function(data){
         $scope.status = "There was an error";
       });
     }
  }
  $scope.setDetailedDish = function(dish) {
    Dinner.setDetailedDish(dish);
  }
});

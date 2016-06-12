dinnerPlannerApp.controller('InstructionsCtrl', function ($scope,Dinner) {
  $scope.menu = Dinner.getFullMenu();
  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }
});

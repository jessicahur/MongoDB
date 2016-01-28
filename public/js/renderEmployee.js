var employeeApp = angular.module( 'employeeApp', []);

employeeApp.controller('EmployeeController', function($scope, $http) {

  $http.get('/employees').then( function( res ) {
    $scope.employees = res.data;//Angular specific
  });
});

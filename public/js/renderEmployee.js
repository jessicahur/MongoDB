var employeeApp = angular.module( 'employeeApp', []);

employeeApp.controller('EmployeeController', function($scope, $http) {

  $http.get('/employees').then( function( res ) {
    $scope.employees = res.data;//Angular specific
  });
  $scope.delete = function(employee) {
    $scope.deleteEmployeeId = employee._id;
    $http.delete('/employees/'+$scope.deleteEmployeeId)
         .then(
          function(res){
            console.log(res.data);
            $scope.deleteConfirmation = 'Deleted Employee:';
            $scope.deletedEmployee = res.data;
            var temp = [];
            $scope.employees.forEach(function(employee){
              if (employee._id != $scope.deleteEmployeeId){
                temp.push(employee);
              }
            });
            $scope.employees = temp;
          },
          function(err){
            $scope.deleteConfirmation = res.statusText;
          });
  }
});


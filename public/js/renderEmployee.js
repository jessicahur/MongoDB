var employeeApp = angular.module( 'employeeApp', []);

employeeApp.controller('EmployeeController', function($scope, $http) {

  //GET
  $http.get('/employees').then( function( res ) {
    $scope.employees = res.data;//Angular specific
    $scope.employees.forEach(function(employee){
      employee.DOB = employee.DOB.substring(0,10);
    });
  });

  //DELETE
  $scope.delete = function(employee) {
    $scope.deleteEmployeeId = employee._id;
    $http.delete('/employees/'+$scope.deleteEmployeeId)
         .then(
          function(res){
            $scope.deleteConfirmation = 'Deleted Employee:';
            $scope.deletedEmployee = res.data;
            $scope.deletedEmployee.DOB = $scope.deletedEmployee.DOB.substring(0,10);
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

  //EDIT-PUT/PATCH
  $scope.edit = function(employee) {
    $scope.newEmployee = employee;
    $scope.idHolder = $scope.newEmployee._id;
    $scope.editEmployee = true;
  }
  $scope.cancelEdit = function() {
    $http.get('/employees/'+$scope.idHolder)
         .then(
            function(res) {
              var temp = [];
              $scope.employees.forEach(function(employee){
                if (employee._id != $scope.newEmployee._id){
                  temp.push(employee);
                }
              });
              $scope.employees = temp;
              $scope.employees.push(res.data);
              $scope.newEmployee = null;
            }
          )
  }
  $scope.editSelectedEmployee = function() {
    // var selectedEmployee = $scope.newEmployee;
    // console.log(selectedEmployee);
    // delete selectedEmployee._id;
    $http.put('/employees/'+$scope.newEmployee._id, $scope.newEmployee)
         .then(
            function(res){
              // console.log(res);
              $scope.editedEmployee = res.data;
              $scope.editedEmployee.DOB = $scope.editedEmployee.DOB.substring(0,10);
              $scope.newEmployee = {};
              // var temp = [];
              // $scope.employees.forEach(function(employee){
              //   if (employee._id != $scope.editedEmployeeId){
              //     temp.push(employee);
              //   }
              // });
              // $scope.employees = temp;
              // $scope.editEmployee = false;
            },
            function(err){
              $scope.badRequest = `${err.status}: ${err.statusText}`;
            }
          )
  }

  //ADD-POST
  $scope.addEmployee = function() {
    $http.post('/employees', JSON.stringify($scope.newEmployee))
         .then(
            function(res){
              var newEmployee = res.data;
              newEmployee.DOB = newEmployee.DOB.substring(0,10);
              $scope.employees.push(newEmployee);
              $scope.badRequest = null;
              $scope.newEmployee = {};
            },
            function(err){
              $scope.badRequest = `${err.status}: ${err.statusText}`;
            }
          )
  }
});


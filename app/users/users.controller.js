app.controller('usersController', function($scope, $mdDialog, $mdToast, usersFactory){
 
    // read users
    $scope.readUsers = function(){
 
        // use users factory
        usersFactory.readUsers().then(function successCallback(response){
            $scope.users = response.data.records;
        }, function errorCallback(response){
            $scope.showToast("Unable to read record.");
        });
 
    }


    $scope.readPaging = function(page_num){
 
        // use users factory
        usersFactory.readPaging(page_num).then(function successCallback(response){
            $scope.users = response.data.records;
            $scope.pages = response.data.paging.pages;
        }, function errorCallback(response){
            $scope.showToast("Unable to read record.");
        });
 
    }
     
    // show 'create user form' in dialog box
    $scope.showCreateUserForm = function(event){
     
        $mdDialog.show({
            controller: DialogController,
            templateUrl: './app/users/create_user.template.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });
    }
     
    // create new user
    $scope.createUser = function(){
     
        usersFactory.createUser($scope).then(function successCallback(response){
     
            // tell the user new user was created
            $scope.showToast(response.data.message);
     
            // refresh the list
            //$scope.readUsers();
            $scope.readPaging(1);
     
            // close dialog
            $scope.cancel();
     
            // remove form values
            $scope.clearUserForm();
     
        }, function errorCallback(response){
            $scope.showToast("Unable to create record.");
        });
    }

    // clear variable / form values
    $scope.clearUserForm = function(){
        $scope.user_id = "";
        $scope.first_name = "";
        $scope.middle_name = "";
        $scope.last_name = "";
        $scope.gender = "";
        $scope.email = "";
        $scope.date_time = "";
    }

    // show toast message
    $scope.showToast = function(message){
        $mdToast.show(
            $mdToast.simple()
                .textContent(message)
                .hideDelay(3000)
                .position("top right")
        );
    }

    // retrieve record to fill out the form
    $scope.readOneUser = function(id){
     
        // get user to be edited
        usersFactory.readOneUser(id).then(function successCallback(response){
     
            // put the values in form
            $scope.user_id = response.data.user_id;
            $scope.first_name = response.data.first_name;
            $scope.middle_name = response.data.middle_name;
            $scope.last_name = response.data.last_name;
            $scope.gender = response.data.gender;
            $scope.email = response.data.email;
     
            $mdDialog.show({
                controller: DialogController,
                templateUrl: './app/users/read_one_user.template.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                fullscreen: true
            }).then(
                function(){},
     
                // user clicked 'Cancel'
                function() {
                    // clear modal content
                    $scope.clearProductForm();
                }
            );
     
        }, function errorCallback(response){
            $scope.showToast("Unable to retrieve record.");
        });
     
    }
     
    // retrieve record to fill out the form
    $scope.showUpdateUserForm = function(user_id){
     
        // get user to be edited
        usersFactory.readOneUser(user_id).then(function successCallback(response){
     
            // put the values in form
            $scope.user_id = response.data.user_id;
            $scope.first_name = response.data.first_name;
            $scope.middle_name = response.data.middle_name;
            $scope.last_name = response.data.last_name;
            $scope.gender = response.data.gender;
            $scope.email = response.data.email;
     
            $mdDialog.show({
                controller: DialogController,
                templateUrl: './app/users/update_user.template.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                fullscreen: true
            }).then(
                function(){},
     
                // user clicked 'Cancel'
                function() {
                    // clear modal content
                    $scope.clearUserForm();
                }
            );
     
        }, function errorCallback(response){
            $scope.showToast("Unable to retrieve record.");
        });
     
    }
     
    // update user record / save changes
    $scope.updateUser = function(){
     
        usersFactory.updateUser($scope).then(function successCallback(response){
     
            // tell the user user record was updated
            $scope.showToast(response.data.message);
     
            // refresh the user list
            //$scope.readUsers();
            $scope.readPaging(1);

     
            // close dialog
            $scope.cancel();
     
            // clear modal content
            $scope.clearUserForm();
     
        },
        function errorCallback(response) {
            $scope.showToast("Unable to update record.");
        });
     
    }
     
    // cofirm user deletion
    $scope.confirmDeleteUser = function(event, user_id){
     
        // set id of record to delete
        $scope.user_id = user_id;
     
        // dialog settings
        var confirm = $mdDialog.confirm()
            .title('Are you sure?')
            .textContent('User will be deleted.')
            .targetEvent(event)
            .ok('Yes')
            .cancel('No');
     
        // show dialog
        $mdDialog.show(confirm).then(
            // 'Yes' button
            function() {
                // if user clicked 'Yes', delete user record
                $scope.deleteUser();
            },
     
            // 'No' button
            function() {
                // hide dialog
            }
        );
    }

    // delete user
    $scope.deleteUser = function(){
     
        usersFactory.deleteUser($scope.user_id).then(function successCallback(response){
     
            // tell the user user was deleted
            $scope.showToast(response.data.message);
     
            // refresh the list
            //$scope.readUsers();
            $scope.readPaging(1);

     
        }, function errorCallback(response){
            $scope.showToast("Unable to delete record.");
        });
     
    }
     
    // search users
    $scope.searchUsers = function(){
     
        // use users factory
        usersFactory.searchUsers($scope.user_search_keywords).then(function successCallback(response){
            $scope.products = response.data.records;
        }, function errorCallback(response){
            $scope.showToast("Unable to read record.");
        });
    }

    $scope.selectGender = ['Male', 'Female', 'Others']; 

    $scope.demo = {
       showTooltip: false,
       tipDirection: 'top'
     };

     $scope.demo.delayTooltip = undefined;
     $scope.$watch('demo.delayTooltip', function(val) {
       $scope.demo.delayTooltip = parseInt(val, 10) || 0;
     });

    // methods for dialog box
    function DialogController($scope, $mdDialog) {
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    }
});
app.factory("usersFactory", function($http){
 
    var factory = {};
 
    // read all users
    factory.readUsers = function(){
        return $http({
            method: 'GET',
            url: 'http://localhost/storm-users/api/users/read.php'
        });
    };

    // read paging
    factory.readPaging = function(page_num){
        return $http({
            method: 'GET',
            url: 'http://localhost/storm-users/api/users/read_paging.php?page=' + page_num
        });
    };
     
    // create user
    factory.createUser = function($scope){
        return $http({
            method: 'POST',
            data: {
                'user_id' : $scope.user_id,
                'first_name' : $scope.first_name,
                'middle_name' : $scope.middle_name,
                'last_name' : $scope.last_name,
                'gender' : $scope.gender,
                'email' : $scope.email,
                'date_time' : $scope.date_time
            },
            url: 'http://localhost/storm-users/api/users/create.php'
        });
    };
     
    // read one user
    factory.readOneUser = function(user_id){
        return $http({
            method: 'GET',
            url: 'http://localhost/storm-users/api/users/read_one.php?user_id=' + user_id
        });
    };
     
    // update user
    factory.updateUser = function($scope){
     
        return $http({
            method: 'POST',
            data: {
                'user_id' : $scope.user_id,
                'first_name' : $scope.first_name,
                'middle_name' : $scope.middle_name,
                'last_name' : $scope.last_name,
                'gender' : $scope.gender,
                'email' : $scope.email
            },
            url: 'http://localhost/storm-users/api/users/update.php'
        });
    };
     
    // delete user
    factory.deleteUser = function(user_id){
        return $http({
            method: 'POST',
            data: { 'user_id' : user_id },
            url: 'http://localhost/storm-users/api/users/delete.php'
        });
    };
     
    // search all users
    factory.searchUsers = function(keywords){
        return $http({
            method: 'GET',
            url: 'http://localhost/storm-users/api/users/search.php?s=' + keywords
        });
    };
     
    return factory;
});
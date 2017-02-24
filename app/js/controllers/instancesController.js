'use strict';

module.exports = function(app) {
  app.controller('instancesController', ['$rootScope','$scope', '$http', '$cookies','$window', function($rootScope, $scope, $http, $cookies, $window) {

    // Check for token
    var jwt = $cookies.get('jwt');
    $http.defaults.headers.common['x-access-token'] = jwt;

    window.instancesLoaded = false;

    // If token present, get all instances
    if (!$rootScope.instancesLoaded && jwt){
      window.instancesLoaded = true;
      getAll();
    }

    function getAll() {
      $http.get('/api/instances').success(function(response) {
        // In the response, we are sending all of the data for the user that is
        // currently logged in.

          $rootScope.instances = response.data;
          $rootScope.userId = response.userId;
          $rootScope.isCommitted = response.isCommitted;
          $rootScope.hosting = response.hosting;
          $rootScope.userName = response.userName;
          $rootScope.showDetail = false;
          console.log('instances below');
          console.log($scope.instances);

      });
      $http.get('/api/locations').success(function(response) {
        $scope.locations = response.data;
      });
    };

    $scope.findId = function(instance) {
      var users = [];
      instance.participants.forEach(function(participant) {
        users.push(participant._id);
      });
      return users;
    };

    $scope.submitForm = function(instance) {

      instance.host = $scope.userName;
      var time = instance.startTime;

      // Add formatted time for easy readability

      function formatHour(time) {
        var timeArr = time.split(":");
        var hour = timeArr[0];
        var min = timeArr[1];

        //it is pm if hour from 12 onwards
        var suffix = (hour >= 12)? 'pm' : 'am';
        //only -12 from hour if it is greater than 12 (if not back at mid night)
        var hour = (hour > 12)? parseInt(hour - 12) : parseInt(hour);
        //if 00 then it is 12 am
        var hour = (hour == '00')? 12 : parseInt(hour);
        return hour + ':' + min + suffix;
      }

      instance.formattedStartTime = formatHour(time);

      $http.post('/api/instances/', instance).success(function(response) {

        //clear form and reset instance
        $scope.newInstanceForm.$setPristine();
        $scope.instance = {};

        getAll();
      });
    };

    $scope.destroy = function(id) {
      $http.delete('/api/instances/' + id).success(function(response) {
        getAll();
      });
    }

    $scope.edit = function(instance) {
      instance.editing = true;
    };

    $scope.cancel = function(instance) {
      getAll();
    };

    $scope.update = function(instance) {
      $http.put('/api/instances/' + id, instance)
        .error(function(error) {
          $scope.errors.push({
            msg: 'could not update instance'
          });
        });
      instance.editing = false;
      getAll();
    };

    $scope.join = function(id){
      $http.put('/api/instances/' + id + "/join");
    };
    $scope.quit = function(id){
      $http.put('/api/instances/' + id + "/quit");
    };
    $scope.gameOver = function(id){
      $http.put('/api/instances/' + id, {
        gameOver: true
      }).success(function () {
        getAll();
      });
    };
  }]);
};

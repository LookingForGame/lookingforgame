'use strict';

module.exports = function(app) {
  app.controller('instancesController', ['$scope', '$http', '$cookies', '$route', '$window', function($scope, $http, $cookies, $route, $window) {
    var jwt = $cookies.get('jwt');
    $http.defaults.headers.common['x-access-token'] = jwt;
    var getAll = function() {
      $http.get('/api/instances').success(function(response) {
        // In the response, we are sending all of the data for the user that is
        // currently logged in.
        $scope.instances = response.data;
        $scope.userId = response.userId;
        $scope.isCommitted = response.isCommitted;
        $scope.hosting = response.hosting;
        $scope.userName = response.userName;
        $scope.showDetail = false;
        console.log('$scope.instances is below:');
        console.log($scope.instances);
      });
      $http.get('/api/locations').success(function(response) {
        $scope.locations = response.data;
      });
    };
    if (jwt){
      getAll();
    }
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
        $http.get('/api/instances').success(function(response) {
          $scope.instances = response.data;
          // TODO - Update Scope dynamically
          $window.location.reload();
        });
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
    $scope.reloadPage = function() {
      $window.location.reload();
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
      });
    };
  }]);
};

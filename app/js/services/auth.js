'use strict';

module.exports = function(app) {
  app.factory('auth', ['$http', '$cookies', function($http, $cookies) {
    return {
      signIn: function(user, callback) {
        $http.post('/auth/login', user)
          .success(function(data, err) {
            $cookies.put('jwt', data.token);
            callback(data, err);
          })
          .error(function(data) {
            callback(data);
          });
      },

      create: function(user, callback) {
        $http.post('/api/users', user)
          .success(function(data, err) {
            $cookies.put('jwt', data.token)
            callback(data, err);
          })
          .error(function(data, err) {
            callback(data, err);
          });
      },


      logout: function() {
        $cookies.remove('jwt');
      },

      isSignedIn: function() {
        return !!($cookies.get('jwt') && $cookies.get('jwt').length);
      }
    };
  }]);
};

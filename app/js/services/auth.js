'use strict';

module.exports = function(app) {
  app.factory('auth', ['$http', '$cookies', function($http, $cookies) {
    return {
      signIn: function(user, callback) {
          $http.post('/auth/login', user)
            .success(function(data) {
              if (data.success) {
                $cookies.put('jwt', data.token);
                callback(null)
              } else {
                callback(data);
              }
            })
            .error(function(data) {
              callback(data);
            });
      },

      create: function(user, callback) {
        try {
          $http.post('/api/users', user)
            .success(function(data) {
              $cookies.put('jwt', data.token)
              callback(null);
            })
            .error(function(data) {
              callback(data);
            });
        } catch(e) {
          console.log(e)
        }
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

;(function(){
'use strict';

  angular
    .module('yoSoaApp')
       .factory('Auth', Auth);

    /* @inject */
    function Auth(User, $storage, serverUrl, $location, $rootScope, $http, $q) {
      var self = this;

      var currentUser = {};
      if($storage.get('user_token')){
        currentUser = User.one('me').get().$object
      }
      return {
        login: login,
        logout: logout,
        createUser: createUser,
        changePassword: changePassword,
        getCurrentUser: getCurrentUser,
        isLoggedIn: isLoggedIn,
        isLoggedInAsync: isLoggedInAsync,
        isAdmin: isAdmin,
        getToken: getToken
      };

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      function login(user, callback) {
        var callback = callback || angular.noop;
        var deferred = $q.defer();

        var LoginData = {
          email: user.email,
          password: user.password
        }
        $http
          .post(serverUrl+'auth/local', {
            email: user.email,
            password: user.password
          })
          .then(function ( res ) {
            console.log("data", res.data)
            $storage.set('user_token', res.data.token );
            currentUser = User.one('me').get().$object;
            deferred.resolve(res.data);
            return callback();
          })
          .catch(function ( err ) {
            logout();
            deferred.reject( err );
            return callback( err );
          }.bind(self));

        return deferred.promise;
      }

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      function logout() {

        $storage.clear('user_token');
        currentUser = {};
      }

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      function createUser(user, callback) {
        var callback = callback || angular.noop;
        console.log(User)
        return User
          .post(user)
          .then(function (data) {
            console.log("create", data)
            $storage.set('user_token', data.token);
            currentUser = User.one('me').get().$object;
            return callback(data);
          })
          .catch(function (err) {
            console.log("err", err)
            logout();
            return callback(err);
          })
      }

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      function changePassword(oldPassword, newPassword, callback) {
        var callback = callback || angular.noop;
        return User.one(currentUser._id)
          .one('password')
          .put({
            oldPassword: oldPassword,
            newPassword: newPassword
          })
          .then(function (user) {
            return callback(user);
          })
          .catch(function (err) {
            return callback(err);
          });
      }

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      function getCurrentUser() {
        return currentUser;
      }

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      function isLoggedIn() {
        return currentUser.hasOwnProperty('role');
      }

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      function isLoggedInAsync( callback ) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser
            .then(function() {
              callback(true);
            })
            .catch(function() {
              callback(false);
            });
        } else if(currentUser.hasOwnProperty('role')) {
          callback(true);
        } else {
          callback(false);
        }
      }

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      function isAdmin() {
        return currentUser.role === 'admin';
      }

      /**
       * Get auth token
       */
      function getToken() {
        return $storage.get('user_token');
      }
    }
}).call(this);
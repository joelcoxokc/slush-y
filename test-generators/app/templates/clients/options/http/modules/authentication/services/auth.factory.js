;(function(){
'use strict';

  angular
    .module('authentication')
    .factory('Auth', Auth);

    /* @inject */
    function Auth(User, $storage, serverUrl, $location, $rootScope, $http, $q, logger) {
      var self = this;

      var currentUser = {};

      var userApi = createUrl( serverUrl, 'users' );
      var authApi = createUrl( serverUrl, 'auth', 'local');

      if($storage.get('user_token')){
        reloadUserAsync()
          .then( function ( data ){
            currentUser = data || {};
          });
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
        getToken: getToken,
        user: currentUser
      };

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      function login(user, cb) {
        var callback = cb || angular.noop;
        var deferred = $q.defer();

        var LoginData = {
          email: user.email,
          password: user.password
        };
        $http
          .post(authApi, LoginData)
          .then(function ( response ) {
            logger.log('Successfully Signed in');
            $storage.setUser( response.data );
            currentUser = response.data.user;
            deferred.resolve(response.data);
          })
          .catch(function ( err ) {
            logger.logError('There was an error signing in');
            logout();
            deferred.reject( err );
          }.bind(self));

        return deferred.promise;
      }

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      function logout() {
        $storage.clear();
        currentUser = {};
      }

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      function createUser(user, cb) {
        var callback = cb || angular.noop;
        var q = $q.defer();
        $http.post( userApi, user)
          .then(function ( response ) {
            logger.logSuccess('User Created');
            $storage.setUser(response.data);
            currentUser = response.data.user;
            q.resolve(response.data.user);
          })
          .catch(function (err) {
            logger.logSuccess('Error creating User \n' + err);
            logout();
            q.reject(err);
          });
        return q.promise;
      }

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      function changePassword(oldPassword, newPassword, cb) {
        var callback, data;
        callback = cb || angular.noop;
        if(!currentUser){

          currentUser = reloadUser() || {};

        }
        data = {
          oldPassword: oldPassword,
          newPassword: newPassword
        };

        return User.changePassword(currentUser._id, data);
      }

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      function getCurrentUser() {
        currentUser = $storage.getObject('user');
        return currentUser;
      }

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      function isLoggedIn() {
        reloadUser();
        return currentUser.hasOwnProperty('role');
      }

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      function isLoggedInAsync( callback ) {
        if(currentUser) {
          callback(true);
        } else {
          User.getMe()
            .then(function ( response ){
              if(response.data){
                currentUser = response.data;
                $storage.setObject(currentUser);
                callback(true);
              }
            })
            .catch( function (error) {
              callback(false);
            });
        }
      }

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      function isAdmin() {
        if(!currentUser){
          return false;
        }
          return currentUser.role === 'admin';
      }

      /**
       * Get auth token
       */
      function getToken() {
        return $storage.get('user_token');
      }

      /**
       * Reload current user
       */
      function reloadUser() {
        currentUser = $storage.getObject('user') || {};
        return currentUser;
      }
      function reloadUserAsync() {
        var q = $q.defer();
        if(currentUser._id){
          q.resolve(currentUser);
        }
        $http
          .get( createUrl( userApi, 'me' ) )
          .then( function ( response ){
            currentUser = response.data;
            $storage.setObject('user', currentUser);
            q.resolve(currentUser);
          })
          .catch( function ( error ){
            q.reject(error);
            currentUser = {};
            $storage.clear();
          });

        return q.promise;
      }
      function createUrl(){
        var args = Array.prototype.slice.call(arguments);
        return args.join('/');
      }


    }
}).call(this);
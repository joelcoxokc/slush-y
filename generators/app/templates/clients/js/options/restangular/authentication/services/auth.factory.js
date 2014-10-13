;(function(){
'use strict';

  angular
    .module('authentication')
    .factory('Auth', Auth);

    /* @inject */
    function Auth(User, $storage, authRestangular, serverUrl, $location, $rootScope, $http, $q, logger) {
      var self = this;

      var AuthService = authRestangular.all('auth');

      var currentUser = {};
      var userApi = createUrl(serverUrl, 'users');
      var authApi = createUrl(serverUrl, 'auth');


      if($storage.get('user_token')){
        currentUser = User.one('me').get().$object;
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

        AuthService.all('local').post( LoginData )
          .then(function ( response ) {
            logger.logSuccess('User Logged in');
            $storage.setUser( response );
            currentUser = User.one('me').get().$object;
            deferred.resolve(response);
          })
          .catch(function ( err ) {
            logger.logError('Error Logging in');
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
      function createUser(user, cb) {
        var callback = cb || angular.noop;
        var q = $q.defer();
        // $http.post(serverUrl + 'users', user)
        User.post(user)
          .then(function ( response ) {
            logger.logSuccess('User '+ response.user.name +' Created');
            $storage.setUser( response );
            currentUser = User.one('me').get().$object;
            q.resolve( response );
          })
          .catch(function (err) {
            logger.logError('Error creating User' + user.name);
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
        var q = $q.defer()
        var callback = cb || angular.noop;
        var passwordData =  {
          oldPassword: oldPassword,
          newPassword: newPassword
        };

        return $http.put( createUrl(userApi,currentUser._id,'password'), passwordData)
          .then( function (data){
            logger.logSuccess('Password Changed');
            q.resolve( data );
          })
          .catch( function ( error ){
            logger.logSuccess('Error Changing Password');
            q.reject( error );
          });
        return q.promise;
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

      function createUrl(){
        var args = Array.prototype.slice.call(arguments);
        return args.join('/');
      }
    }
}).call(this);
'use strict';

(function() {
  describe('Auth', function() {
    //Initialize global variables
    var scope,
        $httpBackend,
        Auth,
        $storage,
        user,
        userStore;



    // Load the main application module
    beforeEach(module('mean'));
    beforeEach(module('users'));

    beforeEach(inject(function(_Auth_, _$httpBackend_, _$storage_) {
      user = {_id:1, username: 'admin', email: 'admin@admin.com', password: 'admin'};

      $httpBackend = _$httpBackend_;
      Auth = _Auth_;
      $storage = _$storage_;
      $httpBackend.expectGET('http://localhost:9000/api/users')
        .respond({user:user, toke: '202093938932'});

      $httpBackend.expectPOST('http://localhost:9000/api/auth/local', user)
        .respond(user);
      Auth.login(user)
        .then(function(){
          userStore = $storage.getObject('user');
        });

    }));

    it('should expose the Auth service', function() {

      expect(Auth).toBeTruthy();
    });
    it('should store user on login', function() {
      Auth.login(user)
        .then(function(){
          userStore = $storage.getObject('user');
          console.log(userStore);
        });
      userStore = $storage.getObject('user_token');
      expect(Auth).toBeTruthy();
    });
  });
})();
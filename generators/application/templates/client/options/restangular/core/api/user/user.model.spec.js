
'use strict';
describe('API: User', function () {

  // load the service's module
  beforeEach(module('<%= app_names.slug %>'));
  beforeEach(module('core'));

  // instantiate service
  var User;
  beforeEach(inject(function (_User_) {
    User = _User_;
  }));

  it('should do something', function () {
    expect(!!User).toBe(true);
  });

});
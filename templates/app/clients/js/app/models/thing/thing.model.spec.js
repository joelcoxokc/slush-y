
'use strict';
describe('Model: Thing', function () {

  // load the service's module
  beforeEach(module('<%= slugifiedAppName %>'));

  // instantiate service
  var Thing;
  beforeEach(inject(function (_Thing_) {
    Thing = _Thing_;
  }));

  it('should do something', function () {
    expect(!!Thing).toBe(true);
  });

});
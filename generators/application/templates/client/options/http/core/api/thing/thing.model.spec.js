
'use strict';
describe('API: Thing', function () {

  // load the service's module
  beforeEach(module('<%= app_names.slug %>'));
  beforeEach(module('core'));

  // instantiate service
  var Thing;
  beforeEach(inject(function (_Thing_) {
    Thing = _Thing_;
  }));

  it('should do something', function () {
    expect(!!Thing).toBe(true);
  });

});
/*
 * testing-demo
 * https://github.com//testing-demo
 *
 * Copyright (c) 2014 joelcoxokc
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai');
var path = require('path');
chai.expect();
chai.should();

var store = require(path.join('../','lib/store','store.js'));



describe('Store', function(){
    it('is defined', function(){
      store 
        .should.be.a('Object');
    });
    
    
    it('Should have method read', function(){
      store.read.should.be.a('function');
    });
    it('Should have method update', function(){
      store.update.should.be.a('function');
    });
});

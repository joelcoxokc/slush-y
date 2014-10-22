var _ = require('lodash');
var util = require('util')
var chalk = require('chalk')

function Utility (param) {

  var that = this;
}

Utility.prototype.view = function() {
  console.log(this);
  console.log(chalk.red);
  // console.log(this.red('hello world'))
};


var utility = new Utility

utility.view()
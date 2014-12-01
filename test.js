var _ = require('lodash');


var flags = _({name:'People', module:'people', provides:['one', 'two'], functions: ['three', 'four']})

var things = flags
              .first()
              // .isEmpty()
              // .value()

console.log(things);
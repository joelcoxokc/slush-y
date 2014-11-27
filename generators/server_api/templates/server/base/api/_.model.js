(function(){

  'use strict';

  var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var <%= names.single.classed %>Schema = new Schema({
    <% _.forEach(fields, function (item){ %>
    <%=item.key%>: {
      type: <%=item.val%>,
      default: <% if(item.val === 'Date'){%>Date.now<% }else{%>''<%}%>
    },<% }) %>
    // user: {
    //   type: Schema.ObjectId,
    //   ref: 'User'
    // }
  });

  module.exports = mongoose.model('<%= names.single.classed %>', <%= names.single.classed %>Schema);
})();
(function(){

  'use strict';
/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
  var <%= names.single.classed %> = require('./<%= names.single.slug %>.model');

  <%= names.single.classed %>.find({}).remove(function() {

    <%= names.single.classed %>.create(<% _.forEach([1,2,3,4,5,6], function(val){%>
      {<% _.forEach(fields, function(item){%>
        <%=item.key%>: '',<%})%>
      }<% if( val !== 6) {%>,<%}%><%})%>);

  });

})();
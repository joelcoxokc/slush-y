(function(){
  'use strict';

  /**
   * Using Rails-like standard naming convention for endpoints.
   * GET     /<%= names.plural.camel %>              ->  index
   * POST    /<%= names.plural.camel %>              ->  create
   * GET     /<%= names.plural.camel %>/:id          ->  show
   * PUT     /<%= names.plural.camel %>/:id          ->  update
   * DELETE  /<%= names.plural.camel %>/:id          ->  destroy
   */


    var _ = require('lodash');
    var <%= names.single.classed %> = require('./<%= names.single.slug %>.model');

    // Get list of <%= names.plural.camel %>
    exports.index = function(req, res) {
      <%= names.single.classed %>.find(function (err, <%= names.plural.camel %>) {
        if(err) { return handleError(res, err); }
        return res.json(200, <%= names.plural.camel %>);
      });
    };

    // Get a single <%= names.single.camel %>
    exports.show = function(req, res) {
      <%= names.single.classed %>.findById(req.params.id, function (err, <%= names.single.camel %>) {
        if(err) { return handleError(res, err); }
        if(!<%= names.single.camel %>) { return res.send(404); }
        return res.json(<%= names.single.camel %>);
      });
    };

    // Creates a new <%= names.single.camel %> in the DB.
    exports.create = function(req, res) {
      <%= names.single.classed %>.create(req.body, function(err, <%= names.single.camel %>) {
        if(err) { return handleError(res, err); }
        return res.json(201, <%= names.single.camel %>);
      });
    };

    // Updates an existing <%= names.single.camel %> in the DB.
    exports.update = function(req, res) {
      if(req.body._id) { delete req.body._id; }
      <%= names.single.classed %>.findById(req.params.id, function (err, <%= names.single.camel %>) {
        if (err) { return handleError(res, err); }
        if(!<%= names.single.camel %>) { return res.send(404); }
        var updated = _.merge(<%= names.single.camel %>, req.body);
        updated.save(function (err) {
          if (err) { return handleError(res, err); }
          return res.json(200, <%= names.single.camel %>);
        });
      });
    };

    // Deletes a <%= names.single.camel %> from the DB.
    exports.destroy = function(req, res) {
      <%= names.single.classed %>.findById(req.params.id, function (err, <%= names.single.camel %>) {
        if(err) { return handleError(res, err); }
        if(!<%= names.single.camel %>) { return res.send(404); }
        <%= names.single.camel %>.remove(function(err) {
          if(err) { return handleError(res, err); }
          return res.send(204);
        });
      });
    };

    /**
     * <%= names.single.humanized %> middleware
     */
    exports.<%= names.single.camel %>ByID = function(req, res, next, id) {
      <%= names.single.classed %>.findById(id).populate('user', 'displayName').exec(function(err, <%= names.single.camel %>) {
        if (err) return next(err);
        if (!<%= names.single.camel %>) return next(new Error('Failed to load <%= names.single.humanized %> ' + id));
        req.<%= names.single.camel %> = <%= names.single.camel %>;
        next();
      });
    };

    /**
     * <%= names.single.humanized %> authorization middleware
     */
    exports.hasAuthorization = function(req, res, next) {
      if (req.<%= names.single.camel %>.user.id !== req.user.id) {
        return res.send(403, 'User is not authorized');
      }
      next();
    };
    function handleError(res, err) {
      return res.send(500, err);
    }

})();
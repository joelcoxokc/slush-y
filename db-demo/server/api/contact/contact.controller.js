(function(){
  'use strict';

  /**
   * Using Rails-like standard naming convention for endpoints.
   * GET     /contacts              ->  index
   * POST    /contacts              ->  create
   * GET     /contacts/:id          ->  show
   * PUT     /contacts/:id          ->  update
   * DELETE  /contacts/:id          ->  destroy
   */


    var _ = require('lodash');
    var Contact = require('./contact.model');

    // Get list of contacts
    exports.index = function(req, res) {
      Contact.find(function (err, contacts) {
        if(err) { return handleError(res, err); }
        return res.json(200, contacts);
      });
    };

    // Get a single contact
    exports.show = function(req, res) {
      Contact.findById(req.params.id, function (err, contact) {
        if(err) { return handleError(res, err); }
        if(!contact) { return res.send(404); }
        return res.json(contact);
      });
    };

    // Creates a new contact in the DB.
    exports.create = function(req, res) {
      Contact.create(req.body, function(err, contact) {
        if(err) { return handleError(res, err); }
        return res.json(201, contact);
      });
    };

    // Updates an existing contact in the DB.
    exports.update = function(req, res) {
      if(req.body._id) { delete req.body._id; }
      Contact.findById(req.params.id, function (err, contact) {
        if (err) { return handleError(res, err); }
        if(!contact) { return res.send(404); }
        var updated = _.merge(contact, req.body);
        updated.save(function (err) {
          if (err) { return handleError(res, err); }
          return res.json(200, contact);
        });
      });
    };

    // Deletes a contact from the DB.
    exports.destroy = function(req, res) {
      Contact.findById(req.params.id, function (err, contact) {
        if(err) { return handleError(res, err); }
        if(!contact) { return res.send(404); }
        contact.remove(function(err) {
          if(err) { return handleError(res, err); }
          return res.send(204);
        });
      });
    };

    /**
     * Contact middleware
     */
    exports.contactByID = function(req, res, next, id) {
      Contact.findById(id).populate('user', 'displayName').exec(function(err, contact) {
        if (err) return next(err);
        if (!contact) return next(new Error('Failed to load Contact ' + id));
        req.contact = contact;
        next();
      });
    };

    /**
     * Contact authorization middleware
     */
    exports.hasAuthorization = function(req, res, next) {
      if (req.contact.user.id !== req.user.id) {
        return res.send(403, 'User is not authorized');
      }
      next();
    };
    function handleError(res, err) {
      return res.send(500, err);
    }

})();
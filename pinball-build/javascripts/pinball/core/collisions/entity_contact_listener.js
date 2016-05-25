(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Core.ContactCallback = (function() {
    function ContactCallback(entity, enter, leave) {
      this.entity = entity;
      this.enterCallback = enter;
      this.leaveCallback = leave;
    }

    ContactCallback.prototype.leave = function(contact) {
      if (this.leaveCallback != null) {
        return this.leaveCallback.call(void 0, this.entity, contact);
      }
    };

    ContactCallback.prototype.enter = function(contact) {
      if (this.enterCallback != null) {
        return this.enterCallback.call(void 0, this.entity, contact);
      }
    };

    return ContactCallback;

  })();

  Pinball.Core.EntityContactListener = (function() {
    function EntityContactListener(game, entity) {
      this.onEndContact = __bind(this.onEndContact, this);
      this.onBeginContact = __bind(this.onBeginContact, this);
      this.game = game;
      this.entity = entity;
      this.callbacks = [];
      this.game.physics.p2.world.on("beginContact", this.onBeginContact);
      this.game.physics.p2.world.on("endContact", this.onEndContact);
    }

    EntityContactListener.prototype["with"] = function(entity, callbackEnter, callbackLeave) {
      var callback, shape, shapes, _i, _len, _results;
      shapes = entity.getCollisionShapes();
      _results = [];
      for (_i = 0, _len = shapes.length; _i < _len; _i++) {
        shape = shapes[_i];
        callback = new Pinball.Core.ContactCallback(entity, callbackEnter, callbackLeave);
        _results.push(this.callbacks[shape.id] = callback);
      }
      return _results;
    };

    EntityContactListener.prototype.onBeginContact = function(contact) {
      var callback, shape;
      shape = this.identifyOpposite(contact);
      if (shape != null) {
        callback = this.findCallbackForShape(shape);
      }
      if (callback != null) {
        return callback.enter(contact);
      }
    };

    EntityContactListener.prototype.onEndContact = function(contact) {
      var callback, shape;
      shape = this.identifyOpposite(contact);
      if (shape != null) {
        callback = this.findCallbackForShape(shape);
      }
      if (callback != null) {
        return callback.leave(contact);
      }
    };

    EntityContactListener.prototype.identifyOpposite = function(contact) {
      if (this.entity.hasShape(contact.shapeB)) {
        return contact.shapeA;
      }
      if (this.entity.hasShape(contact.shapeA)) {
        return contact.shapeB;
      }
    };

    EntityContactListener.prototype.findCallbackForShape = function(shape) {
      return this.callbacks[shape.id];
    };

    return EntityContactListener;

  })();

}).call(this);

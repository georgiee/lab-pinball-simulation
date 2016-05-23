(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Controller.EntityHitController = (function() {
    function EntityHitController(ballCollision, gameplay) {
      this.handleBallContact = __bind(this.handleBallContact, this);
      this.ballCollision = ballCollision;
      this.gameplay = gameplay;
    }

    EntityHitController.prototype.register = function(list) {
      var entity, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        entity = list[_i];
        if (entity.collidable) {
          _results.push(this.ballCollision["with"](entity.collidable, this.handleBallContact));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    EntityHitController.prototype.handleBallContact = function(collisionEntity) {
      var entity;
      entity = collisionEntity.getEntity();
      return this.gameplay.ballHit(entity);
    };

    return EntityHitController;

  })();

}).call(this);

(function() {
  Pinball.Core.CollideableEntity = (function() {
    function CollideableEntity(entity, shape) {
      this.entity = entity;
      if (shape instanceof Array) {
        this.shapes = shape;
      } else {
        this.shapes = [shape];
      }
    }

    CollideableEntity.prototype.getCollisionShapes = function() {
      return this.shapes;
    };

    CollideableEntity.prototype.getEntity = function() {
      return this.entity;
    };

    CollideableEntity.prototype.hasShape = function(givenShape) {
      var shape, _i, _len, _ref;
      if (this.shapes.length === 1) {
        if (givenShape === this.shapes[0]) {
          return true;
        }
      } else {
        _ref = this.getCollisionShapes();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          shape = _ref[_i];
          if (givenShape === shape) {
            return true;
          }
        }
      }
      return false;
    };

    return CollideableEntity;

  })();

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.FlipperLeft = (function(_super) {
    __extends(FlipperLeft, _super);

    FlipperLeft.prototype.pivotCenter = {
      x: -32,
      y: -1
    };

    FlipperLeft.prototype.clockwise = false;

    FlipperLeft.prototype.sound = 'flipper';

    function FlipperLeft(game, material) {
      FlipperLeft.__super__.constructor.call(this, game, {
        frame: 'entities/flipper_left.png',
        fixture: 'flipper_left',
        material: material
      });
    }

    FlipperLeft.prototype.getID = function() {
      return 'flipperLeft';
    };

    return FlipperLeft;

  })(Pinball.Entities.FlipperBase);

}).call(this);

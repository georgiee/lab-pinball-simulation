(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.FlipperRight = (function(_super) {
    __extends(FlipperRight, _super);

    FlipperRight.prototype.pivotCenter = {
      x: 32,
      y: -1
    };

    FlipperRight.prototype.clockwise = true;

    FlipperRight.prototype.sound = 'flipper';

    function FlipperRight(game, material) {
      FlipperRight.__super__.constructor.call(this, game, {
        frame: 'entities/flipper_right.png',
        fixture: 'flipper_right',
        material: material
      });
    }

    FlipperRight.prototype.getID = function() {
      return 'flipperRight';
    };

    return FlipperRight;

  })(Pinball.Entities.FlipperBase);

}).call(this);

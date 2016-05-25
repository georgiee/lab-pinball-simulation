(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.RampFlipper = (function(_super) {
    __extends(RampFlipper, _super);

    RampFlipper.prototype.pivotCenter = {
      x: -15,
      y: -1
    };

    RampFlipper.prototype.clockwise = false;

    function RampFlipper(game) {
      RampFlipper.__super__.constructor.call(this, game, {
        frame: 'entities/mini_flipper.png',
        fixture: 'mini_flipper'
      });
    }

    RampFlipper.prototype.getID = function() {
      return 'flipperRamp';
    };

    return RampFlipper;

  })(Pinball.Entities.FlipperBase);

}).call(this);

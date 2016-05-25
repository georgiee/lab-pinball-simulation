(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.MissionPlungerShotAndBack = (function(_super) {
    __extends(MissionPlungerShotAndBack, _super);

    MissionPlungerShotAndBack.prototype.score = 100000;

    MissionPlungerShotAndBack.prototype.timeout = 90;

    function MissionPlungerShotAndBack(game, playfield) {
      MissionPlungerShotAndBack.__super__.constructor.call(this, game, playfield);
    }

    MissionPlungerShotAndBack.prototype.prepare = function() {};

    MissionPlungerShotAndBack.prototype.getDescription = function() {
      return '2x shoots in outer lane';
    };

    MissionPlungerShotAndBack.prototype.getID = function() {
      return 'doublePlungerShoot';
    };

    return MissionPlungerShotAndBack;

  })(Pinball.Logic.MissionAbstract);

}).call(this);

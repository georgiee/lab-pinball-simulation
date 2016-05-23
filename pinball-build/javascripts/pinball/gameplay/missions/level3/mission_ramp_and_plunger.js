(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.MissionRampAndPlunger = (function(_super) {
    __extends(MissionRampAndPlunger, _super);

    MissionRampAndPlunger.prototype.score = 300000;

    MissionRampAndPlunger.prototype.timeout = 45;

    function MissionRampAndPlunger(game, playfield) {
      MissionRampAndPlunger.__super__.constructor.call(this, game, playfield);
    }

    MissionRampAndPlunger.prototype.prepare = function() {};

    MissionRampAndPlunger.prototype.getDescription = function() {
      return 'shoot right ramp and outer lane';
    };

    MissionRampAndPlunger.prototype.getID = function() {
      return 'rampAndPlunger';
    };

    return MissionRampAndPlunger;

  })(Pinball.Logic.MissionAbstract);

}).call(this);

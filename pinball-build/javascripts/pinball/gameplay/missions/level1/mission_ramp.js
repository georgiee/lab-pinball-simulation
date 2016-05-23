(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.MissionRamp = (function(_super) {
    __extends(MissionRamp, _super);

    MissionRamp.prototype.score = 100000;

    MissionRamp.prototype.timeout = 60;

    function MissionRamp(game, playfield) {
      MissionRamp.__super__.constructor.call(this, game, playfield);
    }

    MissionRamp.prototype.prepare = function() {
      this.ramp = this.playfield.get('ramp');
      this.arrows = this.playfield.get('missionEnterRampLights');
      this.arrows.transition('alwaysblink');
      this.holeRamp = this.playfield.get('holeRamp');
      this.holeRamp.transition('turnon');
      return this.createExpectation(this.ramp, {
        expectedState: 'disabled',
        count: 2,
        expectedEvent: 'exitUpper'
      });
    };

    MissionRamp.prototype.tearDown = function() {
      this.arrows = this.playfield.get('missionEnterRampLights');
      this.arrows.transition('switchoff');
      return MissionRamp.__super__.tearDown.apply(this, arguments);
    };

    MissionRamp.prototype.getDescription = function() {
      return 'shoot 2x times through ramp';
    };

    MissionRamp.prototype.getID = function() {
      return 'doubleRampShoot';
    };

    return MissionRamp;

  })(Pinball.Logic.MissionAbstract);

}).call(this);

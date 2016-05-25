(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.MissionRampFestival = (function(_super) {
    __extends(MissionRampFestival, _super);

    MissionRampFestival.prototype.score = 300000;

    MissionRampFestival.prototype.timeout = 90;

    function MissionRampFestival(game, playfield) {
      MissionRampFestival.__super__.constructor.call(this, game, playfield);
    }

    MissionRampFestival.prototype.prepare = function() {
      this.ramp = this.playfield.get('ramp');
      this.arrows = this.playfield.get('missionEnterRampLights');
      this.arrows.transition('alwaysblink');
      return this.createExpectation(this.ramp, {
        expectedState: 'disabled',
        expectedEvent: 'exitHole'
      });
    };

    MissionRampFestival.prototype.tearDown = function() {
      this.arrows = this.playfield.get('missionEnterRampLights');
      this.arrows.transition('switchoff');
      return MissionRampFestival.__super__.tearDown.apply(this, arguments);
    };

    MissionRampFestival.prototype.getDescription = function() {
      return 'enter bonus bumper';
    };

    MissionRampFestival.prototype.getID = function() {
      return 'rampFestival';
    };

    return MissionRampFestival;

  })(Pinball.Logic.MissionAbstract);

}).call(this);

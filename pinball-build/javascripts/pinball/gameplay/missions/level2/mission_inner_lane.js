(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.MissionInnerLane = (function(_super) {
    __extends(MissionInnerLane, _super);

    MissionInnerLane.prototype.score = 100000;

    MissionInnerLane.prototype.timeout = 45;

    MissionInnerLane.prototype.fliptargets = ['fliptarget1', 'fliptarget2', 'fliptarget3', 'fliptarget4'];

    MissionInnerLane.prototype.triggers = ['laneInTrigger', 'laneOutTrigger'];

    function MissionInnerLane(game, playfield) {
      MissionInnerLane.__super__.constructor.call(this, game, playfield);
    }

    MissionInnerLane.prototype.prepare = function() {
      var ballIntoLaneExpectation, ballOutLaneExpectation, target;
      _(this.fliptargets).each((function(_this) {
        return function(targetID) {
          var target;
          target = _this.playfield.get(targetID);
          target.transition('turnon');
          return _this.createExpectation(target, {
            expectedState: 'activated',
            activateTransition: 'turnon',
            exitTransition: 'reset'
          });
        };
      })(this));
      target = this.playfield.get('laneInTrigger');
      ballIntoLaneExpectation = this.createExpectation(target, {
        expectedState: 'activated',
        activateTransition: 'turnon',
        exitTransition: 'reset'
      });
      target = this.playfield.get('laneOutTrigger');
      return ballOutLaneExpectation = this.createExpectation(target, {
        required: [ballIntoLaneExpectation],
        expectedState: 'activated',
        activateTransition: 'turnon',
        exitTransition: 'reset'
      });
    };

    MissionInnerLane.prototype.tearDown = function() {
      return MissionInnerLane.__super__.tearDown.apply(this, arguments);
    };

    MissionInnerLane.prototype.getDescription = function() {
      return 'open inner lane and shoot through';
    };

    MissionInnerLane.prototype.getID = function() {
      return 'innerLaneShot';
    };

    return MissionInnerLane;

  })(Pinball.Logic.MissionAbstract);

}).call(this);

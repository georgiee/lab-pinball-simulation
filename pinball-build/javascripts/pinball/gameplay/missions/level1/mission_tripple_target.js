(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.MissionTrippleTargets = (function(_super) {
    __extends(MissionTrippleTargets, _super);

    MissionTrippleTargets.prototype.score = 100000;

    MissionTrippleTargets.prototype.timeout = 30;

    MissionTrippleTargets.prototype.targets = ['target1', 'target2', 'target3'];

    function MissionTrippleTargets(game, playfield) {
      MissionTrippleTargets.__super__.constructor.call(this, game, playfield);
    }

    MissionTrippleTargets.prototype.prepare = function() {
      return _(this.targets).each((function(_this) {
        return function(targetID) {
          var target;
          target = _this.playfield.get(targetID);
          target.transition('turnon');
          return _this.createExpectation(target, {
            expectedState: 'activated',
            exitTransition: 'reset'
          });
        };
      })(this));
    };

    MissionTrippleTargets.prototype.getDescription = function() {
      return 'Tripple\nTargets';
    };

    MissionTrippleTargets.prototype.getID = function() {
      return 'trippleTarget';
    };

    return MissionTrippleTargets;

  })(Pinball.Logic.MissionAbstract);

}).call(this);

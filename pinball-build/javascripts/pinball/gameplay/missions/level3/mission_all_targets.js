(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.MissionAllTargets = (function(_super) {
    __extends(MissionAllTargets, _super);

    MissionAllTargets.prototype.score = 100000;

    MissionAllTargets.prototype.timeout = 60;

    MissionAllTargets.prototype.targets = ['target1', 'target2', 'target3', 'target4', 'target5', 'target6', 'target7'];

    function MissionAllTargets(game, playfield) {
      MissionAllTargets.__super__.constructor.call(this, game, playfield);
    }

    MissionAllTargets.prototype.prepare = function() {
      return _(this.targets).each((function(_this) {
        return function(targetID) {
          var target;
          target = _this.playfield.get(targetID);
          return _this.createExpectation(target, {
            expectedState: 'activated',
            activateTransition: 'turnon',
            exitTransition: 'reset'
          });
        };
      })(this));
    };

    MissionAllTargets.prototype.getDescription = function() {
      return 'Shoot all\ntargets';
    };

    MissionAllTargets.prototype.getID = function() {
      return 'allTargets';
    };

    return MissionAllTargets;

  })(Pinball.Logic.MissionAbstract);

}).call(this);

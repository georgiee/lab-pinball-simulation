(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.MissionDoubleTargetsNarrow = (function(_super) {
    __extends(MissionDoubleTargetsNarrow, _super);

    MissionDoubleTargetsNarrow.prototype.score = 100000;

    MissionDoubleTargetsNarrow.prototype.timeout = 30;

    MissionDoubleTargetsNarrow.prototype.targets = ['target4', 'target5'];

    function MissionDoubleTargetsNarrow(game, playfield) {
      MissionDoubleTargetsNarrow.__super__.constructor.call(this, game, playfield);
    }

    MissionDoubleTargetsNarrow.prototype.prepare = function() {
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

    MissionDoubleTargetsNarrow.prototype.getDescription = function() {
      return 'Double\nTargets';
    };

    MissionDoubleTargetsNarrow.prototype.getID = function() {
      return 'doubleTargetNarrow';
    };

    return MissionDoubleTargetsNarrow;

  })(Pinball.Logic.MissionAbstract);

}).call(this);

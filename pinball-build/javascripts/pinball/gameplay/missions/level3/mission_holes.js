(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.MissionHoles = (function(_super) {
    __extends(MissionHoles, _super);

    MissionHoles.prototype.score = 400000;

    MissionHoles.prototype.timeout = 30;

    MissionHoles.prototype.holes = ['holeBL', 'holeBR'];

    function MissionHoles(game, playfield) {
      MissionHoles.__super__.constructor.call(this, game, playfield);
    }

    MissionHoles.prototype.prepare = function() {
      return _(this.holes).each((function(_this) {
        return function(targetID) {
          var target;
          target = _this.playfield.get(targetID);
          return _this.createExpectation(target, {
            expectedState: 'teleporter',
            activateTransition: 'turnon',
            exitTransition: 'reset'
          });
        };
      })(this));
    };

    MissionHoles.prototype.getDescription = function() {
      return 'holes left\and right';
    };

    MissionHoles.prototype.getID = function() {
      return 'holeHits';
    };

    return MissionHoles;

  })(Pinball.Logic.MissionAbstract);

}).call(this);

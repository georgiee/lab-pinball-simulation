(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.StartMissionAction = (function(_super) {
    __extends(StartMissionAction, _super);

    function StartMissionAction(game, machine, options) {
      StartMissionAction.__super__.constructor.call(this, game, options);
      this.machine = machine;
      this.gameplay = this.machine.gameplay;
    }

    StartMissionAction.prototype.run = function() {
      return this.gameplay.startMission();
    };

    StartMissionAction.prototype.getType = function() {
      return 'startmission';
    };

    return StartMissionAction;

  })(Pinball.Logic.ActionAbstract);

}).call(this);

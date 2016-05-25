(function() {
  Pinball.Logic.ActionFactory = (function() {
    function ActionFactory(game, machine) {
      this.game = game;
      this.machine = machine;
      this.playfield = this.machine.playfield;
      this.gameplay = this.machine.gameplay;
      this.gameModel = this.machine.gameModel;
      this.actions = [];
    }

    ActionFactory.prototype.getActions = function(name) {
      return _(this.actions).where({
        target: name
      });
    };

    ActionFactory.prototype.create = function(options) {
      switch (options.action) {
        case 'sound':
          return this.createSound(options);
        case 'score':
          return this.createScore(options);
        case 'teleport':
          return this.createTeleport(options);
        case 'lighten':
          return this.createLighten(options);
        case 'targetLighten':
          return this.createTargetLighten(options);
        case 'endball':
          return this.createEndBall(options);
        case 'statechange':
          return this.createStateChange(options);
        case 'startmission':
          return this.createStartMission(options);
        case 'display':
          return this.createDisplay(options);
      }
    };

    ActionFactory.prototype.createTargetLighten = function(options) {
      var action;
      action = new Pinball.Logic.TargetLightAction(this.game, this.gameModel, this.playfield, options);
      this.actions.push(action);
      return action;
    };

    ActionFactory.prototype.createLighten = function(options) {
      var action;
      action = new Pinball.Logic.LightenAction(this.game, this.gameModel, this.playfield, options);
      this.actions.push(action);
      return action;
    };

    ActionFactory.prototype.createEndBall = function(options) {
      var action;
      action = new Pinball.Logic.EndBallAction(this.game, this.gameplay, this.playfield, options);
      this.actions.push(action);
      return action;
    };

    ActionFactory.prototype.createSound = function(options) {
      var action;
      action = new Pinball.Logic.SoundAction(this.game, options);
      this.actions.push(action);
      return action;
    };

    ActionFactory.prototype.createScore = function(options) {
      var action;
      action = new Pinball.Logic.ScoreAction(this.game, this.gameModel, options);
      this.actions.push(action);
      return action;
    };

    ActionFactory.prototype.createTeleport = function(options) {
      var action;
      action = new Pinball.Logic.TeleportAction(this.game, this.gameModel, this.playfield, this.machine, options);
      this.actions.push(action);
      return action;
    };

    ActionFactory.prototype.createStateChange = function(options) {
      var action;
      action = new Pinball.Logic.StateChangeAction(this.game, this.machine, options);
      this.actions.push(action);
      return action;
    };

    ActionFactory.prototype.createStartMission = function(options) {
      var action;
      action = new Pinball.Logic.StartMissionAction(this.game, this.machine, options);
      this.actions.push(action);
      return action;
    };

    ActionFactory.prototype.createDisplay = function(options) {
      var action;
      action = new Pinball.Logic.DisplayAction(this.game, this.machine, options);
      this.actions.push(action);
      return action;
    };

    return ActionFactory;

  })();

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Gameplay = (function() {
    function Gameplay(game, machine) {
      this.addAction = __bind(this.addAction, this);
      this.handleMissionEnded = __bind(this.handleMissionEnded, this);
      this.handleMissionStarted = __bind(this.handleMissionStarted, this);
      this.game = game;
      this.machine = machine;
      this.playfield = this.machine.playfield;
      this.gameModel = this.machine.gameModel;
    }

    Gameplay.prototype.create = function() {
      this.stateTransitions = new Pinball.Logic.StateTransitions(this.game, this.playfield, this.gameModel, this);
      this.stateTransitions.parse(Pinball.LOGIC.states);
      this.actionFactory = new Pinball.Logic.ActionFactory(this.game, this.machine);
      this.actionList = new Pinball.ActionList(Pinball.LOGIC.actions);
      this.actionList.each(this.addAction);
      this.missions = new Pinball.Logic.MissionManager(this.game, this.machine);
      this.missions.missionStartedSignal.add(this.handleMissionStarted);
      return this.missions.missionEndedSignal.add(this.handleMissionEnded);
    };

    Gameplay.prototype.handleMissionStarted = function(mission) {};

    Gameplay.prototype.handleMissionEnded = function(mission) {};

    Gameplay.prototype.startMission = function() {
      return this.missions.startRandom();
    };

    Gameplay.prototype.startGame = function() {
      this.gameModel.startGame();
      this.stateTransitions.trigger('newgame');
      return this.newBall();
    };

    Gameplay.prototype.addAction = function(actionData) {
      var action, entity;
      action = this.actionFactory.create(actionData);
      entity = this.playfield.get(action.target);
      if (entity && entity.actionable) {
        return entity.actionable.addAction(action);
      }
    };

    Gameplay.prototype.newMission = function() {
      return this.stateTransitions.trigger('newmission');
    };

    Gameplay.prototype.endedMission = function() {
      return this.stateTransitions.trigger('endedmisison');
    };

    Gameplay.prototype.newBall = function() {
      var ball, entities;
      ball = this.playfield.get('ball');
      ball.add();
      entities = this.playfield.getAll();
      this.gameModel.ballActive(true);
      return this.stateTransitions.trigger('newball');
    };

    Gameplay.prototype.endBall = function() {
      var ball;
      this.missions.stop();
      ball = this.playfield.get('ball');
      ball.remove();
      this.gameModel.ballActive(false);
      this.stateTransitions.trigger('endball');
      return this.game.time.events.add(500, (function(_this) {
        return function() {
          return _this.newBall();
        };
      })(this));
    };

    Gameplay.prototype.ballHit = function(entity) {
      if (entity.eventable != null) {
        return entity.eventable.trigger('hit');
      }
    };

    Gameplay.prototype.triggerAll = function(event) {
      var entities, entity, _i, _len, _results;
      entities = this.playfield.getAll();
      _results = [];
      for (_i = 0, _len = entities.length; _i < _len; _i++) {
        entity = entities[_i];
        if (entity.eventable != null) {
          _results.push(entity.eventable.trigger(event));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Gameplay;

  })();

}).call(this);

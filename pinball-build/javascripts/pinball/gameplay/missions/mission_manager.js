(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Logic.MissionManager = (function() {
    MissionManager.prototype.missionTrigger = 'rollover5';

    function MissionManager(game, machine) {
      this.handleMissionStart = __bind(this.handleMissionStart, this);
      this.handleMissionStop = __bind(this.handleMissionStop, this);
      this.handleMissionTimeProgress = __bind(this.handleMissionTimeProgress, this);
      this.handleMissionEnded = __bind(this.handleMissionEnded, this);
      this.missionStartedSignal = new Phaser.Signal();
      this.missionEndedSignal = new Phaser.Signal();
      this.missions = [];
      this.game = game;
      this.machine = machine;
      this.gameplay = this.machine.gameplay;
      this.gameModel = this.machine.gameModel;
      this.playfield = machine.playfield;
      this.display = this.playfield.get('display');
      this.init();
    }

    MissionManager.prototype.init = function() {
      this.fsm = StateMachine.create(this.getStateConfig());
      this.register(new Pinball.Logic.MissionRamp(this.game, this.playfield));
      this.register(new Pinball.Logic.MissionTrippleTargets(this.game, this.playfield));
      this.register(new Pinball.Logic.MissionDoubleTargetsNarrow(this.game, this.playfield));
      this.register(new Pinball.Logic.MissionInnerLane(this.game, this.playfield));
      this.register(new Pinball.Logic.MissionRampFestival(this.game, this.playfield));
      this.register(new Pinball.Logic.MissionHoles(this.game, this.playfield));
      return this.register(new Pinball.Logic.MissionAllTargets(this.game, this.playfield));
    };

    MissionManager.prototype.stop = function() {
      if (this.fsm.can('disable')) {
        return this.fsm.disable();
      }
    };

    MissionManager.prototype.getStateConfig = function() {
      return {
        initial: 'idle',
        error: function() {
          return 'Mission is busy';
        },
        events: [
          {
            name: 'start',
            from: 'idle',
            to: 'running'
          }, {
            name: 'disable',
            from: 'running',
            to: 'stopped'
          }, {
            name: 'reset',
            from: '*',
            to: 'idle'
          }
        ],
        callbacks: {
          onrunning: this.handleMissionStart,
          onstopped: this.handleMissionStop,
          onidle: this.handleNoMission
        }
      };
    };

    MissionManager.prototype.register = function(mission) {
      return this.missions.push(mission);
    };

    MissionManager.prototype.startRandom = function() {
      this.currentMission = this.missions[Math.floor(Math.random() * this.missions.length)];
      return this.fsm.start();
    };

    MissionManager.prototype.handleMissionEnded = function() {
      this.display.clear();
      if (this.currentMission.isFulfilled()) {
        this.display.setText('Mission\ncompleted!');
        this.display.blink(100, 0, 10);
        this.gameModel.addScore(this.currentMission.getScore());
      } else {
        this.display.setText('Mission\nTimeout!');
      }
      return this.fsm.disable();
    };

    MissionManager.prototype.handleMissionTimeProgress = function(timeLeft) {
      return this.display.setText2(timeLeft);
    };

    MissionManager.prototype.startCurrentMission = function() {
      this.currentMission.endedSignal.addOnce(this.handleMissionEnded);
      this.currentMission.timeProgressSignal.add(this.handleMissionTimeProgress);
      return this.currentMission.start();
    };

    MissionManager.prototype.handleMissionStop = function() {
      this.currentMission.destroy();
      delete this.currentMission;
      this.gameplay.endedMission();
      return this.fsm.reset();
    };

    MissionManager.prototype.handleMissionStart = function() {
      this.display.clear();
      this.display.setText('Mission\nactivated');
      this.display.blink(100, 0, 10);
      this.display.setText3(this.currentMission.getDescription());
      this.gameplay.newMission();
      return this.startCurrentMission();
    };

    return MissionManager;

  })();

}).call(this);

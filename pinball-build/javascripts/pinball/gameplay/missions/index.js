(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Logic.MissionAbstract = (function() {
    MissionAbstract.prototype.score = 100000;

    MissionAbstract.prototype.timeout = 5;

    function MissionAbstract(game, playfield) {
      this.onMissionTimedOut = __bind(this.onMissionTimedOut, this);
      this.onMissionTimeProgress = __bind(this.onMissionTimeProgress, this);
      this.handleExpectationChanged = __bind(this.handleExpectationChanged, this);
      this.timeLeft = -1;
      this.endedSignal = new Phaser.Signal();
      this.timeProgressSignal = new Phaser.Signal();
      this.game = game;
      this.playfield = playfield;
      this.expectations = [];
      this.missionTimer = this.game.time.create(false);
    }

    MissionAbstract.prototype.prepare = function() {};

    MissionAbstract.prototype.createExpectation = function(target, expectedState, expectedEvent) {
      var expectation;
      expectation = new Pinball.Logic.MissionExpectation(target, expectedState, expectedEvent);
      expectation.changed.add(this.handleExpectationChanged);
      this.expectations.push(expectation);
      return expectation;
    };

    MissionAbstract.prototype.handleExpectationChanged = function(expectation) {
      if (this.isFulfilled()) {
        return this.completeMission();
      }
    };

    MissionAbstract.prototype.isFulfilled = function() {
      return _(this.expectations).every(function(e) {
        return e.fulfilled;
      });
    };

    MissionAbstract.prototype.completeMission = function() {
      if (this.isFulfilled()) {

      } else {

      }
      this.tearDown();
      return this.endedSignal.dispatch();
    };

    MissionAbstract.prototype.tearDown = function() {
      this.missionTimer.stop(true);
      _(this.expectations).each(function(expectation) {
        return expectation.destroy();
      });
      return this.expectations = [];
    };

    MissionAbstract.prototype.startTimer = function() {
      this.timeLeft = this.timeout;
      this.missionTimer.add(this.timeout * 1000, this.onMissionTimedOut);
      this.missionTimer.repeat(1000, this.timeout, this.onMissionTimeProgress);
      return this.missionTimer.start();
    };

    MissionAbstract.prototype.onMissionTimeProgress = function() {
      this.timeLeft = this.timeLeft - 1;
      return this.timeProgressSignal.dispatch(this.timeLeft);
    };

    MissionAbstract.prototype.onMissionTimedOut = function() {
      return this.completeMission();
    };

    MissionAbstract.prototype.destroy = function() {
      this.tearDown();
      this.endedSignal.removeAll();
      return this.timeProgressSignal.removeAll();
    };

    MissionAbstract.prototype.start = function() {
      this.prepare();
      return this.startTimer();
    };

    MissionAbstract.prototype.getDescription = function() {
      return void 0;
    };

    MissionAbstract.prototype.getID = function() {
      return void 0;
    };

    MissionAbstract.prototype.getScore = function() {
      return this.score;
    };

    return MissionAbstract;

  })();

}).call(this);
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
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.MissionRamp = (function(_super) {
    __extends(MissionRamp, _super);

    MissionRamp.prototype.score = 100000;

    MissionRamp.prototype.timeout = 60;

    function MissionRamp(game, playfield) {
      MissionRamp.__super__.constructor.call(this, game, playfield);
    }

    MissionRamp.prototype.prepare = function() {
      this.ramp = this.playfield.get('ramp');
      this.arrows = this.playfield.get('missionEnterRampLights');
      this.arrows.transition('alwaysblink');
      this.holeRamp = this.playfield.get('holeRamp');
      this.holeRamp.transition('turnon');
      return this.createExpectation(this.ramp, {
        expectedState: 'disabled',
        count: 2,
        expectedEvent: 'exitUpper'
      });
    };

    MissionRamp.prototype.tearDown = function() {
      this.arrows = this.playfield.get('missionEnterRampLights');
      this.arrows.transition('switchoff');
      return MissionRamp.__super__.tearDown.apply(this, arguments);
    };

    MissionRamp.prototype.getDescription = function() {
      return 'shoot 2x times through ramp';
    };

    MissionRamp.prototype.getID = function() {
      return 'doubleRampShoot';
    };

    return MissionRamp;

  })(Pinball.Logic.MissionAbstract);

}).call(this);
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
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.MissionPlungerShotAndBack = (function(_super) {
    __extends(MissionPlungerShotAndBack, _super);

    MissionPlungerShotAndBack.prototype.score = 100000;

    MissionPlungerShotAndBack.prototype.timeout = 90;

    function MissionPlungerShotAndBack(game, playfield) {
      MissionPlungerShotAndBack.__super__.constructor.call(this, game, playfield);
    }

    MissionPlungerShotAndBack.prototype.prepare = function() {};

    MissionPlungerShotAndBack.prototype.getDescription = function() {
      return '2x shoots in outer lane';
    };

    MissionPlungerShotAndBack.prototype.getID = function() {
      return 'doublePlungerShoot';
    };

    return MissionPlungerShotAndBack;

  })(Pinball.Logic.MissionAbstract);

}).call(this);
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
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.MissionRampAndPlunger = (function(_super) {
    __extends(MissionRampAndPlunger, _super);

    MissionRampAndPlunger.prototype.score = 300000;

    MissionRampAndPlunger.prototype.timeout = 45;

    function MissionRampAndPlunger(game, playfield) {
      MissionRampAndPlunger.__super__.constructor.call(this, game, playfield);
    }

    MissionRampAndPlunger.prototype.prepare = function() {};

    MissionRampAndPlunger.prototype.getDescription = function() {
      return 'shoot right ramp and outer lane';
    };

    MissionRampAndPlunger.prototype.getID = function() {
      return 'rampAndPlunger';
    };

    return MissionRampAndPlunger;

  })(Pinball.Logic.MissionAbstract);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Logic.MissionExpectation = (function() {
    MissionExpectation.prototype.fulfilled = false;

    function MissionExpectation(target, options) {
      this.handleTargetChangedState = __bind(this.handleTargetChangedState, this);
      this.options = options;
      this.target = target;
      this.count = options.count || 1;
      this.changed = new Phaser.Signal();
      this.expectedState = options.expectedState;
      this.expectedEvent = options.expectedEvent;
      this.otherExpectationsRequired = options.required;
      this.target.stateChangedSignal.add(this.handleTargetChangedState);
      if (this.options.activateTransition) {
        this.target.transition(this.options.activateTransition);
      }
    }

    MissionExpectation.prototype.handleTargetChangedState = function(event, from, to) {
      if ((this.expectedState === to) && (this.expectedEvent === event || !this.expectedEvent) && this.otherExpectationsFulfilled()) {
        return this.complete();
      }
    };

    MissionExpectation.prototype.otherExpectationsFulfilled = function() {
      var result;
      if (!this.otherExpectationsRequired) {
        return true;
      }
      result = _(this.otherExpectationsRequired).every(function(e) {
        return e.fulfilled;
      });
      return result;
    };

    MissionExpectation.prototype.complete = function() {
      this.count = this.count - 1;
      if (this.count === 0) {
        console.log('expectation fulfilled!');
        this.fulfilled = true;
        return this.changed.dispatch(this);
      }
    };

    MissionExpectation.prototype.destroy = function() {
      if (this.options.exitTransition) {
        this.target.transition(this.options.exitTransition);
      }
      return this.target.stateChangedSignal.remove(this.handleTargetChangedState);
    };

    return MissionExpectation;

  })();

}).call(this);
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
(function() {


}).call(this);

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

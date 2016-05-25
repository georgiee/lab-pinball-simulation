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

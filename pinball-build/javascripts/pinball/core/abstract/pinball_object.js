(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Base.PinballObject = (function() {
    function PinballObject(game, options, material) {
      this.handleStateChanged = __bind(this.handleStateChanged, this);
      this.game = game;
      this.options = options;
      this._id = options.name;
      this.actionable = new Pinball.Base.ComponentActions();
      this.eventable = new Pinball.Base.ComponentEvents(this);
      this.eventable.register('hit', this.hit);
      this.eventable.register('endball', this.endBall);
      this.eventable.register('newball', this.newBall);
      this.createFSM();
    }

    PinballObject.prototype.createFSM = function() {
      this.stateChangedSignal = new Phaser.Signal();
      this.fsm = StateMachine.create(this.getStateConfig());
      return this.fsm.onenterstate = this.handleStateChanged;
    };

    PinballObject.prototype.handleStateChanged = function(event, from, to) {
      if (this.actionable) {
        this.actionable.run(to);
      }
      return this.stateChangedSignal.dispatch(event, from, to);
    };

    PinballObject.prototype.transition = function(event) {
      return this.fsm[event]();
    };

    PinballObject.prototype.getStateConfig = function() {
      return {};
    };

    PinballObject.prototype.getType = function() {
      return void 0;
    };

    PinballObject.prototype.getID = function() {
      return this._id;
    };

    PinballObject.prototype.hit = function() {
      if (this.fsm && this.fsm['hit'] && this.fsm.can('hit')) {
        return this.fsm.hit();
      }
    };

    PinballObject.prototype.endBall = function() {};

    PinballObject.prototype.newBall = function() {};

    return PinballObject;

  })();

}).call(this);

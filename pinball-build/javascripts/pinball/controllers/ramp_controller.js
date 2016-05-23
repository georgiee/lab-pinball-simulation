(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Controller.RampController = (function() {
    function RampController(game, ballCollisionsListener, playfield) {
      this.ballCanEnterCenter = __bind(this.ballCanEnterCenter, this);
      this.handleTransition = __bind(this.handleTransition, this);
      this.handleUpperExit = __bind(this.handleUpperExit, this);
      this.handleLowerExit = __bind(this.handleLowerExit, this);
      this.handleEnterCenter = __bind(this.handleEnterCenter, this);
      this.handleLeaveCenter = __bind(this.handleLeaveCenter, this);
      this.handleEnterRamp = __bind(this.handleEnterRamp, this);
      this.playfield = playfield;
      this.ramp = playfield.get('ramp');
      this.ball = playfield.get('ball');
      this.ballCollision = ballCollisionsListener;
      this.ballCollision["with"](this.ramp.getEnterSensor(), this.handleEnterRamp);
      this.ballCollision["with"](this.ramp.getCenterSensor(), this.handleEnterCenter);
      this.ballCollision["with"](this.ramp.getLowerExitSensor(), this.handleLowerExit);
      this.ballCollision["with"](this.ramp.getUpperExitSensor(), this.handleUpperExit);
      this.ballCollision["with"](this.ramp.getTransitionSensor(), this.handleTransition);
      this.ballCollision["with"](this.ramp.getLeaveCenterSensor(), this.handleLeaveCenter);
    }

    RampController.prototype.enableRamp = function() {
      this.ramp.transition('enable');
      return this.playfield.moveBallOverRamp();
    };

    RampController.prototype.disableRampAfterHole = function() {
      this.ramp.transition('exitHole');
      return this.playfield.moveBallBehindRamp();
    };

    RampController.prototype.disableRamp = function() {
      this.ramp.transition('disable');
      return this.playfield.moveBallBehindRamp();
    };

    RampController.prototype.handleEnterRamp = function(entity, contact) {
      console.log('handleEnterRamp');
      if (this.ballCanEnterRamp(contact)) {
        return this.enableRamp();
      }
    };

    RampController.prototype.handleLeaveCenter = function(entity, contact) {
      return this.ramp.transition('enterUpper');
    };

    RampController.prototype.handleEnterCenter = function(entity, contact) {
      if (this.ballCanEnterCenter(contact)) {
        return this.ramp.transition('enterCenter');
      }
    };

    RampController.prototype.handleLowerExit = function(entity, contact) {
      this.ramp.transition('exitLower');
      return this.playfield.moveBallBehindRamp();
    };

    RampController.prototype.handleUpperExit = function(entity, contact) {
      this.ramp.transition('exitUpper');
      return this.playfield.moveBallBehindRamp();
    };

    RampController.prototype.handleTransition = function() {
      return this.ramp.transition('transitionLowerUpper');
    };

    RampController.prototype.ballCanEnterRamp = function(contact) {
      var eq, normalA, nx, ny;
      if (contact.contactEquations) {
        eq = contact.contactEquations[0];
        normalA = eq.normalA;
        nx = normalA[0];
        ny = normalA[1];
        if (ny > 0) {
          eq.enabled = false;
          return true;
        } else {
          return false;
        }
      }
      return false;
    };

    RampController.prototype.ballCanEnterCenter = function(contact) {
      var eq, normalA, nx, ny;
      if (contact.contactEquations) {
        eq = contact.contactEquations[0];
        normalA = eq.normalA;
        nx = normalA[0];
        ny = normalA[1];
        if (ny > 0) {
          eq.enabled = false;
          return true;
        } else {
          return false;
        }
      }
      return false;
    };

    return RampController;

  })();

}).call(this);

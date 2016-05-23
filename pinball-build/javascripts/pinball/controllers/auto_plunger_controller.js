(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Controller.AutoPlungerController = (function() {
    function AutoPlungerController(game, ballCollisionsListener, playfield) {
      this.handleBallInAutoPlunger = __bind(this.handleBallInAutoPlunger, this);
      this.autoPlunger = playfield.get('autoPlunger');
      this.sensorOut = this.autoPlunger.sensor.collideable;
      this.ball = playfield.get('ball');
      this.ballCollision = ballCollisionsListener;
      this.ballCollision["with"](this.sensorOut, this.handleBallInAutoPlunger);
    }

    AutoPlungerController.prototype.handleBallInAutoPlunger = function(entity) {
      return this.autoPlunger.shootBall(this.ball);
    };

    return AutoPlungerController;

  })();

}).call(this);

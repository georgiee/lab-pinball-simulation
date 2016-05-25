(function() {
  Pinball.Debug = (function() {
    function Debug(game) {
      this.game = game;
      this.game.time.advancedTiming = true;
      this.fspCounter = 0;
      this.fspSummed = 0;
      this.fpsAverage = 0;
    }

    Debug.prototype.renderGeneralInfo = function() {
      var bodyCount, framesWindowSize, renderer, shapeCount, verticesCount;
      if (this.game.time.fps > 0) {
        this.fspSummed = this.fspSummed + this.game.time.fps;
        this.fspCounter = this.fspCounter + 1;
        framesWindowSize = 10 * 60;
        if (this.fspCounter > framesWindowSize) {
          this.fspSummed = this.fpsAverage;
          this.fspCounter = 1;
        }
        this.fpsAverage = Math.round(this.fspSummed / this.fspCounter);
      }
      this.game.debug.text("" + this.game.time.fps + "(" + this.fpsAverage + ")", 580, 20);
      bodyCount = this.game.physics.p2.world.bodies.length;
      shapeCount = _(this.game.physics.p2.world.bodies).reduce((function(sum, body) {
        return sum + body.shapes.length;
      }), 0);
      verticesCount = _(this.game.physics.p2.world.bodies).reduce((function(sum, body) {
        return sum + (_(body.shapes).reduce((function(sum, shape) {
          return sum + (shape.vertices ? shape.vertices.length : 0);
        }), 0));
      }), 0);
      this.game.debug.text("b: " + bodyCount + ", s: " + shapeCount + " v: " + verticesCount, 20, 20);
      renderer = this.game.renderType === Phaser.WEBGL ? 'webgl' : 'canvas';
      return this.game.debug.text("" + renderer, 20, 40);
    };

    Debug.prototype.placeBallAtMouse = function(ball) {
      return ball.reset(this.game.input.x, this.game.input.y);
    };

    Debug.prototype.shootBallIntoRamp = function(ball) {
      ball.reset(390, 589);
      return this.shootBall(ball, 135, 40);
    };

    Debug.prototype.shootBall = function(ball, angle, speed) {
      var p2body;
      angle = angle / 180 * Math.PI;
      p2body = ball.body.data;
      p2body.velocity[0] = Math.cos(angle) * speed;
      return p2body.velocity[1] = Math.sin(angle) * speed;
    };

    Debug.prototype.shootBallInSlingshot = function(ball) {
      this.ball.reset(280, 690);
      return this.shootBall(ball, -45, 40);
    };

    return Debug;

  })();

}).call(this);

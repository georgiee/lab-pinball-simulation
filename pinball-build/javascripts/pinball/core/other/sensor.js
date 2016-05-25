(function() {
  Pinball.Sensor = (function() {
    function Sensor(game, fixture, debug) {
      if (debug == null) {
        debug = false;
      }
      this.game = game;
      this.debug = debug;
      this.p2 = this.game.physics.p2;
      this.build(fixture);
      this.collideable = new Pinball.Core.CollideableEntity(this, this.getMainShape());
    }

    Sensor.prototype.addShape = function(shape) {
      return this.body.addShape(shape);
    };

    Sensor.prototype.addFixture = function(fixture) {
      if (fixture == null) {
        return;
      }
      return Pinball.PhysicsUtils.addFixtureToBody(this.game, this.body, fixture);
    };

    Sensor.prototype.build = function(fixture) {
      var debugBody;
      this.body = new p2.Body();
      this.addFixture(fixture);
      this.p2.world.addBody(this.body);
      if (this.debug) {
        return debugBody = new Phaser.Physics.P2.BodyDebug(this.game, this.body);
      }
    };

    Sensor.prototype.getMainShape = function() {
      return this.body.shapes[0];
    };

    return Sensor;

  })();

}).call(this);

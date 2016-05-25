(function() {
  Pinball.Entities.SurfaceZones = (function() {
    function SurfaceZones(game, ball) {
      this.game = game;
      this.buildTriggerZones();
    }

    SurfaceZones.prototype.buildTriggerZones = function() {
      this.zone_tl = this.createZone(0, 0, 320, 485);
      this.zoneEnityTL = new Pinball.Core.CollideableEntity(this, this.zone_tl);
      this.zone_tr = this.createZone(320, 0, 320, 485);
      this.zoneEnityTR = new Pinball.Core.CollideableEntity(this, this.zone_tr);
      this.zone_bl = this.createZone(0, 485, 320, 485);
      this.zoneEnityBL = new Pinball.Core.CollideableEntity(this, this.zone_bl);
      this.zone_br = this.createZone(320, 485, 320, 485);
      return this.zoneEnityBR = new Pinball.Core.CollideableEntity(this, this.zone_br);
    };

    SurfaceZones.prototype.createZone = function(x, y, w, h) {
      var body, debugBody, shape, world;
      world = this.game.physics.p2;
      body = new p2.Body({
        position: [world.pxmi(x + w / 2), world.pxmi(y + h / 2)]
      });
      shape = new p2.Rectangle(world.pxm(w), world.pxm(h));
      shape.collisionGroup = 1;
      shape.collisionMask = 2;
      shape.sensor = true;
      body.addShape(shape);
      world.world.addBody(body);
      if (this.debug) {
        debugBody = new Phaser.Physics.P2.BodyDebug(this.game, body);
        debugBody.alpha = 0.3;
      }
      return shape;
    };

    return SurfaceZones;

  })();

}).call(this);

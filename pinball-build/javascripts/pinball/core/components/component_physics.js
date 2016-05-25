(function() {
  Pinball.Base.ComponentPhysics = (function() {
    function ComponentPhysics(game, options, sprite) {
      if (sprite == null) {
        sprite = null;
      }
      this.game = game;
      this.world = this.game.physics.p2;
      this.position = options.position;
      this.options = options;
      this.sprite = sprite;
      this.buildBody();
      this.createFixture();
    }

    ComponentPhysics.prototype.setMaterial = function(material, fixtureKey) {
      if (this.sprite) {
        return this.fixtureGroup.setMaterial(material, fixtureKey);
      }
    };

    ComponentPhysics.prototype.buildBody = function() {
      var phaserBody;
      if (this.sprite) {
        this.game.physics.p2.enable(this.sprite, this.options.debug);
        phaserBody = this.sprite.body;
        phaserBody.clearShapes();
        phaserBody["static"] = !this.options.dynamic;
        phaserBody.allowSleep = true;
        this.body = phaserBody.data;
        return this.phaserBody = phaserBody;
      } else {
        this.body = new p2.Body({
          position: [this.world.pxmi(this.position[0]), this.world.pxmi(this.position[1])]
        });
        this.body.allowSleep = true;
        return this.world.world.addBody(this.body);
      }
    };

    ComponentPhysics.prototype.getCollisionShapes = function(keys) {
      return this.fixtureGroup.getFixtures(keys);
    };

    ComponentPhysics.prototype.setCollisionMask = function(bit) {
      return this.fixtureGroup.setMask(bit);
    };

    ComponentPhysics.prototype.setMass = function(value) {
      this.body.mass = value;
      return this.body.updateMassProperties();
    };

    ComponentPhysics.prototype.createFixture = function() {
      var data, debugBody, fixture, fixtureData, fixtures, _i, _len;
      if (this.sprite && this.options.fixture) {
        fixtures = this.sprite.body.addPhaserPolygon('physics', this.options.fixture);
      } else if (this.options.fixture) {
        data = this.game.cache.getPhysicsData('physics', this.options.fixture);
        fixtures = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          fixtureData = data[_i];
          fixture = Pinball.PhysicsUtils.addFixtureToBody(this.game, this.body, fixtureData);
          fixtures.push(fixture);
        }
      } else {
        if (this.options.dimensions) {
          fixture = new p2.Rectangle(this.world.pxmi(this.options.dimensions[0]), this.world.pxmi(this.options.dimensions[1]));
        } else {
          fixture = new p2.Circle(this.world.pxm(this.options.radius || 20));
        }
        fixture.collisionGroup = Pinball.Bits.TABLE;
        fixture.collisionMask = Pinball.Bits.BALL;
        fixture.sensor = true;
        if (this.options.fixtureOffset) {
          this.body.addShape(fixture, this.options.fixtureOffset[0], this.options.fixtureOffset[1]);
        } else {
          this.body.addShape(fixture);
        }
        if (this.options.debug) {
          debugBody = new Phaser.Physics.P2.BodyDebug(this.game, this.body);
        }
      }
      return this.fixtureGroup = new Phaser.Physics.P2.FixtureList(fixture || fixtures);
    };

    return ComponentPhysics;

  })();

}).call(this);

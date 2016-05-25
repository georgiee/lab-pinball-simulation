(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.Surface = (function(_super) {
    __extends(Surface, _super);

    function Surface(game, x, y) {
      this.handleZoneUpdate = __bind(this.handleZoneUpdate, this);
      Surface.__super__.constructor.call(this, game, x, y, 'table');
      this.init();
    }

    Surface.prototype.init = function() {
      this.debug = false;
      this.removeNextStep = [];
      this.zones = new Pinball.Entities.SurfaceZones(this.game);
      this.collisionGroup = this.game.physics.p2.createCollisionGroup();
      this.game.physics.p2.enable(this, Pinball.Store.DEBUG_PHYSICS);
      this.body["static"] = true;
      this.body.clearShapes();
      return this.buildZones();
    };

    Surface.prototype.createSensor = function(key, debug) {
      var fixture, sensor;
      if (debug == null) {
        debug = false;
      }
      fixture = this.game.cache.getPhysicsData('physics', 'table_sensors', key);
      sensor = new Pinball.Sensor(this.game, fixture, debug);
      return sensor;
    };

    Surface.prototype.buildZones = function() {
      this.bodyZone1 = this.createBody('physics', 'table_zone_1');
      this.bodyZone2 = this.createBody('physics', 'table_zone_2');
      this.bodyZone3 = this.createBody('physics', 'table_zone_3');
      return this.bodyZone4 = this.createBody('physics', 'table_zone_4');
    };

    Surface.prototype.handleZoneUpdate = function(nr, active) {
      if (nr === 1) {
        this.enableZone1(active);
      }
      if (nr === 2) {
        this.enableZone2(active);
      }
      if (nr === 3) {
        this.enableZone3(active);
      }
      if (nr === 4) {
        return this.enableZone4(active);
      }
    };

    Surface.prototype.preUpdate = function() {
      var body, _results;
      _results = [];
      while (this.removeNextStep.length > 0) {
        body = this.removeNextStep.pop();
        if (body.world != null) {
          _results.push(this.game.physics.p2.world.removeBody(body));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Surface.prototype.enableAllZones = function() {
      this.enableZone1(true);
      this.enableZone2(true);
      this.enableZone3(true);
      return this.enableZone4(true);
    };

    Surface.prototype.enableZone = function(zone, enabled) {
      var index;
      if (enabled) {
        if ((index = this.removeNextStep.indexOf(zone)) !== -1) {
          this.removeNextStep.splice(index, 1);
        }
        if (zone.world == null) {
          return this.game.physics.p2.world.addBody(zone);
        }
      } else {
        return this.removeNextStep.push(zone);
      }
    };

    Surface.prototype.enableZone1 = function(enabled) {
      return this.enableZone(this.bodyZone1, enabled);
    };

    Surface.prototype.enableZone2 = function(enabled) {
      return this.enableZone(this.bodyZone2, enabled);
    };

    Surface.prototype.enableZone3 = function(enabled) {
      return this.enableZone(this.bodyZone3, enabled);
    };

    Surface.prototype.enableZone4 = function(enabled) {
      return this.enableZone(this.bodyZone4, enabled);
    };

    Surface.prototype.createBody = function(key, object) {
      var body, data, debugBody, fixtureData, _i, _len;
      data = this.game.cache.getPhysicsData(key, object);
      body = new p2.Body();
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        fixtureData = data[_i];
        Pinball.PhysicsUtils.addFixtureToBody(this.game, body, fixtureData);
      }
      if (this.debug) {
        debugBody = new Phaser.Physics.P2.BodyDebug(this.game, body);
      }
      return body;
    };

    Surface.prototype.getID = function() {
      return 'surface';
    };

    Surface.prototype.getType = function() {
      return 'surface';
    };

    return Surface;

  })(Phaser.Sprite);

}).call(this);

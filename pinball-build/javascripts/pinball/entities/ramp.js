(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.Ramp = (function(_super) {
    __extends(Ramp, _super);

    function Ramp(game, x, y, ball, debug) {
      if (debug == null) {
        debug = false;
      }
      this.handleCenterRamp = __bind(this.handleCenterRamp, this);
      this.handleUpperRamp = __bind(this.handleUpperRamp, this);
      this.handleLowerRamp = __bind(this.handleLowerRamp, this);
      this.handleEnabled = __bind(this.handleEnabled, this);
      this.handleDisabled = __bind(this.handleDisabled, this);
      Ramp.__super__.constructor.call(this, game, {
        position: [x, y],
        fullFrame: 'ramp'
      });
      this.debug = false;
      this.anchor.set(0.5);
      this.ball = ball;
      this.init();
      this.createFSM();
    }

    Ramp.prototype.getID = function() {
      return 'ramp';
    };

    Ramp.prototype.getType = function() {
      return 'ramp';
    };

    Ramp.prototype.init = function() {
      this.removeNextStep = [];
      this.p2world = this.game.physics.p2;
      this.createRamp();
      this.createSensors();
      return this.createCollisionEntities();
    };

    Ramp.prototype.getStateConfig = function() {
      return {
        initial: 'disabled',
        events: [
          {
            name: 'enable',
            from: '*',
            to: 'enabled'
          }, {
            name: 'enterLower',
            from: ['enabled', 'upperRamp'],
            to: 'lowerRamp'
          }, {
            name: 'enterUpper',
            from: ['centerRamp', 'lowerRamp'],
            to: 'upperRamp'
          }, {
            name: 'enterCenter',
            from: 'upperRamp',
            to: 'centerRamp'
          }, {
            name: 'disable',
            from: '*',
            to: 'disabled'
          }, {
            name: 'transitionLowerUpper',
            from: 'lowerRamp',
            to: 'upperRamp'
          }, {
            name: 'exitLower',
            from: '*',
            to: 'disabled'
          }, {
            name: 'exitHole',
            from: '*',
            to: 'disabled'
          }, {
            name: 'exitUpper',
            from: '*',
            to: 'disabled'
          }
        ],
        callbacks: {
          ondisabled: this.handleDisabled,
          onenabled: this.handleEnabled,
          onlowerRamp: this.handleLowerRamp,
          onupperRamp: this.handleUpperRamp,
          oncenterRamp: this.handleCenterRamp
        }
      };
    };

    Ramp.prototype.handleDisabled = function() {
      return this.disableRamp();
    };

    Ramp.prototype.handleEnabled = function() {
      return this.fsm.enterLower();
    };

    Ramp.prototype.getEnterSensor = function() {
      return this.enterSensorEntity;
    };

    Ramp.prototype.getCenterSensor = function() {
      return this.enterCenterSensorEntity;
    };

    Ramp.prototype.getLeaveCenterSensor = function() {
      return this.leaveCenterSensorEntity;
    };

    Ramp.prototype.getLowerExitSensor = function() {
      return this.lowerExitSensorEntity;
    };

    Ramp.prototype.getUpperExitSensor = function() {
      return this.upperExitSensorEntity;
    };

    Ramp.prototype.getTransitionSensor = function() {
      return this.transitionSensorEntity;
    };

    Ramp.prototype.handleLowerRamp = function() {
      return this.enableLowerRamp();
    };

    Ramp.prototype.handleUpperRamp = function() {
      return this.enableUpperRamp();
    };

    Ramp.prototype.handleCenterRamp = function() {
      return this.enableRampCenter();
    };

    Ramp.prototype.createSensors = function() {
      this.transitionSensor = this.createSensor('transition');
      this.upperExitSensor = this.createSensor('upperExit');
      this.lowerExitSensor = this.createSensor('lowerExit');
      this.enterSensor = this.createSensor('enterRectangle');
      this.enterCenterSensor = this.createSensor('enterCenterRectangle');
      return this.leaveCenterSensor = this.createSensor('leaveCenter');
    };

    Ramp.prototype.createCollisionEntities = function() {
      this.enterSensorEntity = new Pinball.Core.CollideableEntity(this, this.enterSensor.shapes[0]);
      this.enterCenterSensorEntity = new Pinball.Core.CollideableEntity(this, this.enterCenterSensor.shapes[0]);
      this.leaveCenterSensorEntity = new Pinball.Core.CollideableEntity(this, this.leaveCenterSensor.shapes[0]);
      this.lowerExitSensorEntity = new Pinball.Core.CollideableEntity(this, this.lowerExitSensor.shapes[0]);
      this.upperExitSensorEntity = new Pinball.Core.CollideableEntity(this, this.upperExitSensor.shapes[0]);
      return this.transitionSensorEntity = new Pinball.Core.CollideableEntity(this, this.transitionSensor.shapes[0]);
    };

    Ramp.prototype.disableRamp = function() {
      this.ball.resetCollisionMask();
      this.removeFromWorld(this.lowerBodies);
      this.removeFromWorld(this.upperBodies);
      if (this.debug) {
        _(this.lowerBodies).each(function(body) {
          return body.debug.visible = false;
        });
        _(this.upperBodies).each(function(body) {
          return body.debug.visible = false;
        });
        return _(this.centerBodies).each(function(body) {
          return body.debug.visible = false;
        });
      }
    };

    Ramp.prototype.preUpdate = function() {
      var body, _results;
      return this.removeNextStep.length === 0;
      _results = [];
      while (this.removeNextStep.length > 0) {
        body = this.removeNextStep.pop();
        if (body.world != null) {
          _results.push(this.p2world.world.removeBody(body));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Ramp.prototype.enableLowerRamp = function() {
      this.ball.setCollisionMask(Pinball.Bits.groups.RAMP_LOWER());
      this.removeFromWorld(this.upperBodies);
      this.removeFromWorld(this.centerBodies);
      this.addToWorld(this.lowerBodies);
      if (this.debug) {
        _(this.lowerBodies).each(function(body) {
          return body.debug.visible = true;
        });
        _(this.upperBodies).each(function(body) {
          return body.debug.visible = false;
        });
        return _(this.centerBodies).each(function(body) {
          return body.debug.visible = false;
        });
      }
    };

    Ramp.prototype.enableUpperRamp = function() {
      this.ball.setCollisionMask(Pinball.Bits.groups.RAMP_UPPER());
      this.removeFromWorld(this.lowerBodies);
      this.removeFromWorld(this.centerBodies);
      this.addToWorld(this.upperBodies);
      if (this.debug) {
        _(this.lowerBodies).each(function(body) {
          return body.debug.visible = false;
        });
        _(this.centerBodies).each(function(body) {
          return body.debug.visible = false;
        });
        return _(this.upperBodies).each(function(body) {
          return body.debug.visible = true;
        });
      }
    };

    Ramp.prototype.enableRampCenter = function() {
      this.ball.setCollisionMask(Pinball.Bits.groups.RAMP_CENTER());
      this.removeFromWorld(this.lowerBodies);
      this.removeFromWorld(this.upperBodies);
      this.addToWorld(this.centerBodies);
      if (this.debug) {
        _(this.lowerBodies).each(function(body) {
          return body.debug.visible = false;
        });
        _(this.centerBodies).each(function(body) {
          return body.debug.visible = true;
        });
        return _(this.upperBodies).each(function(body) {
          return body.debug.visible = false;
        });
      }
    };

    Ramp.prototype.createSensor = function(key) {
      var body, debugBody, fixture;
      fixture = this.game.cache.getPhysicsData('physics', 'ramp_sensors', key);
      if (fixture == null) {
        return;
      }
      body = new p2.Body({
        position: this.getBodyCenter()
      });
      Pinball.PhysicsUtils.addFixtureToBody(this.game, body, fixture);
      this.p2world.world.addBody(body);
      if (this.debug) {
        debugBody = new Phaser.Physics.P2.BodyDebug(this.game, body);
      }
      return body;
    };

    Ramp.prototype.createRamp = function() {
      this.staticBodies = this.createBodies('ramp_static');
      _(this.staticBodies).each((function(_this) {
        return function(body) {
          return body.debug.visible = _this.debug;
        };
      })(this));
      this.addToWorld(this.staticBodies);
      this.lowerBodies = this.createBodies('ramp_lower');
      this.upperBodies = this.createBodies('ramp_upper');
      return this.centerBodies = this.createBodies('ramp_center');
    };

    Ramp.prototype.addToWorld = function(bodies) {
      var body, index, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = bodies.length; _i < _len; _i++) {
        body = bodies[_i];
        if ((index = this.removeNextStep.indexOf(body)) !== -1) {
          this.removeNextStep.splice(index, 1);
        }
        if (body.world == null) {
          _results.push(this.p2world.world.addBody(body));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Ramp.prototype.removeFromWorld = function(bodies) {
      var body, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = bodies.length; _i < _len; _i++) {
        body = bodies[_i];
        _results.push(this.removeNextStep.push(body));
      }
      return _results;
    };

    Ramp.prototype.createBodies = function(physicsID) {
      var bodies, body, fixture, staticRampData, _i, _len;
      staticRampData = this.game.cache.getPhysicsData('physics', physicsID);
      bodies = [];
      for (_i = 0, _len = staticRampData.length; _i < _len; _i++) {
        fixture = staticRampData[_i];
        body = new p2.Body({
          position: this.getBodyCenter()
        });
        Pinball.PhysicsUtils.addFixtureToBody(this.game, body, fixture);
        body.debug = Pinball.PhysicsUtils.debugBody(this.game, body);
        body.debug.visible = false;
        bodies.push(body);
      }
      return bodies;
    };

    Ramp.prototype.getBodyCenter = function() {
      return [this.p2world.pxmi(this.x - this.width / 2), this.p2world.pxmi(this.y - this.height / 2)];
    };

    return Ramp;

  })(Pinball.Base.PinballEntity);

}).call(this);

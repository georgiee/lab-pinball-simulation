(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.AutoPlunger = (function(_super) {
    __extends(AutoPlunger, _super);

    function AutoPlunger(game, ground) {
      this.shootBallAndReset = __bind(this.shootBallAndReset, this);
      this.updateBody = __bind(this.updateBody, this);
      this.reset = __bind(this.reset, this);
      this.handleEngaged = __bind(this.handleEngaged, this);
      this.handleReset = __bind(this.handleReset, this);
      var fixture;
      AutoPlunger.__super__.constructor.call(this, game, {
        name: 'autoplunger',
        position: [62, 845],
        frame: 'entities/plunger_auto.png',
        fixture: 'plunger_auto',
        debug: false
      });
      fixture = this.game.cache.getPhysicsData('physics', 'table_sensors', 'autoPlunger');
      this.sensor = new Pinball.Sensor(this.game, fixture, false);
      this.anchor.set(0.5, 0);
      this.createFSM();
    }

    AutoPlunger.prototype.getStateConfig = function() {
      return {
        initial: 'idle',
        error: function() {
          return console.log('auto plunger is busy, ignore hits');
        },
        events: [
          {
            name: 'hit',
            from: 'idle',
            to: 'engaged'
          }, {
            name: 'reset',
            from: 'engaged',
            to: 'idle'
          }
        ],
        callbacks: {
          onengaged: this.handleEngaged,
          onreset: this.handleReset
        }
      };
    };

    AutoPlunger.prototype.getCollisionShapes = function() {
      return this.physicsable.getCollisionShapes();
    };

    AutoPlunger.prototype.hit = function() {
      console.log('hit');
      return this.fsm.hit();
    };

    AutoPlunger.prototype.handleReset = function() {
      return console.log('handleReset');
    };

    AutoPlunger.prototype.handleEngaged = function() {
      var ball;
      ball = this.playfield.get('ball');
      ball.body.setZeroForce();
      ball.body.setZeroRotation();
      ball.body.setZeroVelocity();
      return this.tenseAndShootBall();
    };

    AutoPlunger.prototype.tenseAndRelease = function(releaseCallback) {
      var tweenTense;
      tweenTense = this.game.add.tween(this.scale).to({
        y: .5
      }, 500, Phaser.Easing.Linear.None).onUpdateCallback(this.updateBody);
      tweenTense.onComplete.addOnce((function(_this) {
        return function() {
          return _this.release(releaseCallback);
        };
      })(this));
      return tweenTense.start();
    };

    AutoPlunger.prototype.release = function(releaseCallback) {
      var tweenRelease;
      this.physicsable.fixtureGroup.setMask(0);
      tweenRelease = this.game.add.tween(this.scale).to({
        y: 1
      }, 100, Phaser.Easing.Linear.None, false).onUpdateCallback(this.updateBody);
      tweenRelease.start();
      tweenRelease.onComplete.add(this.reset);
      if (releaseCallback != null) {
        return releaseCallback.call();
      }
    };

    AutoPlunger.prototype.reset = function() {
      console.log('reset mask', this.physicsable.fixtureGroup);
      return this.physicsable.fixtureGroup.setMask(Pinball.Bits.BALL);
    };

    AutoPlunger.prototype.updateBody = function() {
      return this.body.y = 845 + (1 - this.scale.y) / 0.5 * 30;
    };

    AutoPlunger.prototype.tenseAndShootBall = function() {
      return this.tenseAndRelease(this.shootBallAndReset);
    };

    AutoPlunger.prototype.shootBallAndReset = function() {
      var ball;
      ball = this.playfield.get('ball');
      ball.shoot(0);
      return this.fsm.reset();
    };

    AutoPlunger.prototype.createDoor = function() {
      this.autoPlungerDoor = new Pinball.Entities.DoorAutoPlunger(this.game);
      this.autoPlungerDoor.slideAlong(this.ground, [640 / 2 + -224 - 15, 970 / 2 + 310 + 41]);
      return this.add(this.autoPlungerDoor);
    };

    return AutoPlunger;

  })(Pinball.Base.PinballEntity);

}).call(this);

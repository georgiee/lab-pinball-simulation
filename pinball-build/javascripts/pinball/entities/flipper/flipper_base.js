(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.FlipperBase = (function(_super) {
    __extends(FlipperBase, _super);

    FlipperBase.prototype.pivotCenter = {
      x: 0,
      y: 0
    };

    FlipperBase.prototype.clockwise = false;

    FlipperBase.prototype.amplitude = -35;

    FlipperBase.prototype.rest_amplitude = 35;

    FlipperBase.prototype.active = false;

    FlipperBase.prototype.motorSpeed = 12;

    function FlipperBase(game, options) {
      this.handleBallHit = __bind(this.handleBallHit, this);
      this.handleCooling = __bind(this.handleCooling, this);
      FlipperBase.__super__.constructor.call(this, game, {
        position: [0, 0],
        frame: options.frame,
        fixture: options.fixture,
        dynamic: true
      });
      if (options.material) {
        this.physicsable.setMaterial(options.material);
      }
      this.createFSM();
      if (this.sound) {
        this.soundEffect = game.add.audio(this.sound);
      }
    }

    FlipperBase.prototype.createFSM = function() {
      return this.fsm = StateMachine.create({
        initial: 'idle',
        events: [
          {
            name: 'hit',
            from: 'idle',
            to: 'active'
          }, {
            name: 'cooldown',
            from: 'active',
            to: 'cooling'
          }, {
            name: 'reset',
            from: 'cooling',
            to: 'idle'
          }
        ],
        callbacks: {
          onactive: this.handleBallHit,
          oncooling: this.handleCooling
        }
      });
    };

    FlipperBase.prototype.hit = function() {
      if (this.fsm.can('hit')) {
        return this.fsm.hit();
      }
    };

    FlipperBase.prototype.handleCooling = function() {
      return this.game.time.events.add(500, (function(_this) {
        return function() {
          return _this.fsm.reset();
        };
      })(this));
    };

    FlipperBase.prototype.handleBallHit = function() {
      return this.fsm.cooldown();
    };

    FlipperBase.prototype.setAmplitudes = function(active, rest) {
      this.amplitude = active;
      return this.rest_amplitude = rest;
    };

    FlipperBase.prototype.playSound = function() {
      if (this.soundEffect != null) {
        return this.soundEffect.play();
      }
    };

    FlipperBase.prototype.enable = function(force) {
      if (force == null) {
        force = false;
      }
      if (this.active && !force) {
        return;
      }
      this.playSound();
      this.active = true;
      return this.setLimits(this.amplitude);
    };

    FlipperBase.prototype.disable = function(force) {
      if (force == null) {
        force = false;
      }
      if (!this.active && !force) {
        return;
      }
      this.active = false;
      return this.setLimits(this.rest_amplitude);
    };

    FlipperBase.prototype.setLimits = function(angle) {
      var flag;
      flag = this.clockwise ? 1 : -1;
      this.revoluteConstraint.upperLimit = Phaser.Math.degToRad(angle * flag);
      this.revoluteConstraint.lowerLimit = Phaser.Math.degToRad(angle * flag);
      if (angle === 0) {
        flag = flag * -1;
      }
      return this.revoluteConstraint.setMotorSpeed(this.motorSpeed * flag);
    };

    FlipperBase.prototype.activateMotor = function() {
      var flag;
      flag = this.clockwise ? 1 : -1;
      this.revoluteConstraint.upperLimitEnabled = true;
      this.revoluteConstraint.lowerLimitEnabled = true;
      this.revoluteConstraint.enableMotor();
      return this.disable(true);
    };

    FlipperBase.prototype.revoluteAround = function(ground, offsets) {
      this.body.x = offsets[0] - this.pivotCenter.x;
      this.body.y = offsets[1] - this.pivotCenter.y;
      this.revoluteConstraint = this.game.physics.p2.createRevoluteConstraint(this, [this.pivotCenter.x, this.pivotCenter.y], ground, offsets);
      return this.activateMotor();
    };

    FlipperBase.prototype.debugPivot = function() {
      var g;
      g = this.body.debugBody.canvas;
      g.clear();
      g.lineStyle(1, 0xff0000);
      g.moveTo(0, 0);
      g.lineTo(this.pivotCenter.x, this.pivotCenter.y);
      g.beginFill(0xff0000);
      g.lineStyle(0);
      g.drawCircle(this.pivotCenter.x, this.pivotCenter.y, 5);
      g.drawCircle(this.pivotCenter.x, this.pivotCenter.y, 5);
      return g.drawCircle(this.pivotCenter.x, this.pivotCenter.y, 5);
    };

    return FlipperBase;

  })(Pinball.Base.PinballEntity);

}).call(this);

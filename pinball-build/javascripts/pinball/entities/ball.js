(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.Ball = (function(_super) {
    __extends(Ball, _super);

    function Ball(game, options) {
      Ball.__super__.constructor.call(this, game, {
        position: [0, 0],
        frame: 'entities/ball_small.png',
        fixture: 'ball_small',
        dynamic: true
      });
      this.physicsable.setMaterial(options.material);
      this.physicsable.setMass(1.2);
      this.body.fixedRotation = true;
    }

    Ball.prototype.preUpdate = function() {
      return this.constrainVelocity(60);
    };

    Ball.prototype.constrainVelocity = function(maxVelocity) {
      var vx, vy;
      vx = this.body.data.velocity[0];
      vy = this.body.data.velocity[1];
      if (vx > maxVelocity) {
        this.body.data.velocity[0] = maxVelocity;
      } else if (vx < -maxVelocity) {
        this.body.data.velocity[0] = -maxVelocity;
      }
      if (vy > maxVelocity) {
        return this.body.data.velocity[1] = maxVelocity;
      } else if (vy < -maxVelocity) {
        return this.body.data.velocity[1] = -maxVelocity;
      }
    };

    Ball.prototype.getType = function() {
      return 'ball';
    };

    Ball.prototype.getID = function() {
      return 'ball';
    };

    Ball.prototype.add = function(x, y) {
      if (x == null) {
        x = 610;
      }
      if (y == null) {
        y = 610;
      }
      this.visible = true;
      this.game.physics.p2.addBody(this.body);
      return this.body.reset(x, y);
    };

    Ball.prototype.remove = function() {
      this.visible = false;
      return this.game.physics.p2.removeBodyNextStep(this.body);
    };

    Ball.prototype.reset = function(x, y) {
      if (x == null) {
        x = 610;
      }
      if (y == null) {
        y = 610;
      }
      this.body.reset(x, y);
      return this.resetCollisionMask();
    };

    Ball.prototype.setCollisionMask = function(bits) {
      return this.physicsable.setCollisionMask(bits);
    };

    Ball.prototype.resetCollisionMask = function() {
      return this.physicsable.setCollisionMask(Pinball.Bits.groups.TABLE());
    };

    Ball.prototype.shoot = function(angle, power) {
      var p2body;
      if (power == null) {
        power = 60;
      }
      angle = (angle + 90) / 180 * Math.PI;
      p2body = this.body.data;
      p2body.velocity[0] = Math.cos(angle) * power;
      return p2body.velocity[1] = Math.sin(angle) * power;
    };

    return Ball;

  })(Pinball.Base.PinballEntity);

}).call(this);

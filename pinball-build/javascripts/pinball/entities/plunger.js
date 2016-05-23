(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.Plunger = (function(_super) {
    __extends(Plunger, _super);

    function Plunger(game) {
      this.handleTensed = __bind(this.handleTensed, this);
      this.handleReleased = __bind(this.handleReleased, this);
      this.tense = __bind(this.tense, this);
      this.release = __bind(this.release, this);
      Plunger.__super__.constructor.call(this, game, {
        name: 'plunger',
        position: [608, 935],
        frame: 'entities/plunger.png',
        fixture: 'plunger',
        dynamic: true,
        debug: false
      });
      this.build();
      this.constraints();
      this.createFSM();
    }

    Plunger.prototype.getStateConfig = function() {
      return {
        initial: 'idle',
        events: [
          {
            name: 'tense',
            from: 'idle',
            to: 'tensed'
          }, {
            name: 'release',
            from: 'tensed',
            to: 'released'
          }, {
            name: 'disable',
            from: '*',
            to: 'disabled'
          }, {
            name: 'enable',
            from: '*',
            to: 'idle'
          }, {
            name: 'reset',
            from: '*',
            to: 'idle'
          }
        ],
        callbacks: {
          ontensed: this.handleTensed,
          onreleased: this.handleReleased
        }
      };
    };

    Plunger.prototype.build = function() {
      var p2World;
      p2World = this.game.physics.p2;
      this.body.fixedRotation = true;
      this.body.data.gravityScale = -1;
      this.anchorBody = new p2.Body({
        position: [p2World.pxmi(608), p2World.pxmi(935)],
        mass: 0
      });
      this.anchorBody.addShape(new p2.Rectangle(p2World.pxm(20), p2World.pxm(20)));
      return p2World.world.addBody(this.anchorBody);
    };

    Plunger.prototype.constraints = function() {
      this.constraint = this.game.physics.p2.createPrismaticConstraint(this, this.anchorBody, true, [0, this.height / 2], [0, 0], [0, 1]);
      this.constraint.upperLimit = this.game.physics.p2.pxm(this.height);
      this.constraint.lowerLimit = this.game.physics.p2.pxm(this.height);
      this.constraint.upperLimitEnabled = true;
      this.constraint.lowerLimitEnabled = true;
      this.constraint.upperLimit = this.game.physics.p2.pxm(0);
      return this.constraint.lowerLimit = this.game.physics.p2.pxm(0);
    };

    Plunger.prototype.release = function() {
      if (this.fsm.can('release')) {
        return this.fsm.release();
      }
    };

    Plunger.prototype.tense = function() {
      if (this.fsm.can('tense')) {
        return this.fsm.tense();
      }
    };

    Plunger.prototype.handleReleased = function() {
      this.constraint.upperLimit = this.game.physics.p2.pxm(0);
      this.constraint.lowerLimit = this.game.physics.p2.pxm(0);
      this.constraint.disableMotor();
      return this.fsm.reset();
    };

    Plunger.prototype.handleTensed = function() {
      this.constraint.motorSpeed = 5;
      this.constraint.upperLimit = this.game.physics.p2.pxm(this.height - 30);
      this.constraint.lowerLimit = this.game.physics.p2.pxm(0);
      return this.constraint.enableMotor();
    };

    return Plunger;

  })(Pinball.Base.PinballEntity);

}).call(this);

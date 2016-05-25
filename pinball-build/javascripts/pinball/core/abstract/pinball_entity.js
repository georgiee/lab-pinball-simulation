(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.PinballEntity = (function(_super) {
    __extends(PinballEntity, _super);

    function PinballEntity(game, options) {
      this.handleStateChanged = __bind(this.handleStateChanged, this);
      if (options.fullFrame) {
        PinballEntity.__super__.constructor.call(this, game, options.position[0], options.position[1], options.fullFrame);
      } else {
        PinballEntity.__super__.constructor.call(this, game, options.position[0], options.position[1], 'sprites', options.frame);
      }
      this.options = options;
      this.anchor.set(0.5);
      this._id = options.name;
      if (options.fixture != null) {
        this.physicsable = new Pinball.Base.ComponentPhysics(this.game, options, this);
      }
      if (this.physicsable) {
        this.collidable = new Pinball.Core.CollideableEntity(this, this.getCollisionShapes());
      }
      this.actionable = new Pinball.Base.ComponentActions();
      this.eventable = new Pinball.Base.ComponentEvents(this);
      this.eventable.register('hit', this.hit);
      this.eventable.register('endball', this.endBall);
      this.eventable.register('newball', this.newBall);
      this.stateChangedSignal = new Phaser.Signal();
    }

    PinballEntity.prototype.getCollisionShapes = function() {
      return this.physicsable.getCollisionShapes();
    };

    PinballEntity.prototype.createFSM = function() {
      this.fsm = StateMachine.create(this.getStateConfig());
      return this.fsm.onenterstate = this.handleStateChanged;
    };

    PinballEntity.prototype.handleStateChanged = function(event, from, to) {
      if (this.actionable) {
        this.actionable.run(to);
      }
      return this.stateChangedSignal.dispatch(event, from, to);
    };

    PinballEntity.prototype.getStateConfig = function() {
      return {};
    };

    PinballEntity.prototype.getBody = function() {
      return this.physicsable.body;
    };

    PinballEntity.prototype.transition = function(event) {
      return this.fsm[event]();
    };

    PinballEntity.prototype.getType = function() {
      return 'entity';
    };

    PinballEntity.prototype.getID = function() {
      return this._id;
    };

    PinballEntity.prototype.hit = function() {
      if (this.fsm && this.fsm['hit'] && this.fsm.can('hit')) {
        return this.fsm.hit();
      }
    };

    PinballEntity.prototype.endBall = function() {};

    PinballEntity.prototype.newBall = function() {};

    return PinballEntity;

  })(Phaser.Sprite);

}).call(this);

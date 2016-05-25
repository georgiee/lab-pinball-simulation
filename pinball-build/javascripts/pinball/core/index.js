(function() {
  Pinball.Base.PinballEntityWrapper = (function() {
    function PinballEntityWrapper(object, options) {
      this.object = object;
      this._id = options.name;
    }

    PinballEntityWrapper.prototype.getObject = function() {
      return this.object;
    };

    PinballEntityWrapper.prototype.getType = function() {
      return 'compatibility_wrapper';
    };

    PinballEntityWrapper.prototype.getID = function() {
      return this._id;
    };

    return PinballEntityWrapper;

  })();

}).call(this);
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
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.PinballGroup = (function(_super) {
    __extends(PinballGroup, _super);

    function PinballGroup(game, options) {
      if (options == null) {
        options = {};
      }
      PinballGroup.__super__.constructor.call(this, game);
      this._id = options.name;
      this.createFSM();
    }

    PinballGroup.prototype.createFSM = function() {
      return this.fsm = StateMachine.create(this.getStateConfig());
    };

    PinballGroup.prototype.transition = function(event) {
      if (this.fsm.can(event)) {
        return this.fsm[event]();
      }
    };

    PinballGroup.prototype.getStateConfig = function() {
      return {};
    };

    PinballGroup.prototype.getType = function() {
      return 'pinball_group';
    };

    PinballGroup.prototype.getID = function() {
      return this._id;
    };

    return PinballGroup;

  })(Phaser.Group);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Base.PinballObject = (function() {
    function PinballObject(game, options, material) {
      this.handleStateChanged = __bind(this.handleStateChanged, this);
      this.game = game;
      this.options = options;
      this._id = options.name;
      this.actionable = new Pinball.Base.ComponentActions();
      this.eventable = new Pinball.Base.ComponentEvents(this);
      this.eventable.register('hit', this.hit);
      this.eventable.register('endball', this.endBall);
      this.eventable.register('newball', this.newBall);
      this.createFSM();
    }

    PinballObject.prototype.createFSM = function() {
      this.stateChangedSignal = new Phaser.Signal();
      this.fsm = StateMachine.create(this.getStateConfig());
      return this.fsm.onenterstate = this.handleStateChanged;
    };

    PinballObject.prototype.handleStateChanged = function(event, from, to) {
      if (this.actionable) {
        this.actionable.run(to);
      }
      return this.stateChangedSignal.dispatch(event, from, to);
    };

    PinballObject.prototype.transition = function(event) {
      return this.fsm[event]();
    };

    PinballObject.prototype.getStateConfig = function() {
      return {};
    };

    PinballObject.prototype.getType = function() {
      return void 0;
    };

    PinballObject.prototype.getID = function() {
      return this._id;
    };

    PinballObject.prototype.hit = function() {
      if (this.fsm && this.fsm['hit'] && this.fsm.can('hit')) {
        return this.fsm.hit();
      }
    };

    PinballObject.prototype.endBall = function() {};

    PinballObject.prototype.newBall = function() {};

    return PinballObject;

  })();

}).call(this);
(function() {
  Pinball.Core.CollideableEntity = (function() {
    function CollideableEntity(entity, shape) {
      this.entity = entity;
      if (shape instanceof Array) {
        this.shapes = shape;
      } else {
        this.shapes = [shape];
      }
    }

    CollideableEntity.prototype.getCollisionShapes = function() {
      return this.shapes;
    };

    CollideableEntity.prototype.getEntity = function() {
      return this.entity;
    };

    CollideableEntity.prototype.hasShape = function(givenShape) {
      var shape, _i, _len, _ref;
      if (this.shapes.length === 1) {
        if (givenShape === this.shapes[0]) {
          return true;
        }
      } else {
        _ref = this.getCollisionShapes();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          shape = _ref[_i];
          if (givenShape === shape) {
            return true;
          }
        }
      }
      return false;
    };

    return CollideableEntity;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Core.ContactCallback = (function() {
    function ContactCallback(entity, enter, leave) {
      this.entity = entity;
      this.enterCallback = enter;
      this.leaveCallback = leave;
    }

    ContactCallback.prototype.leave = function(contact) {
      if (this.leaveCallback != null) {
        return this.leaveCallback.call(void 0, this.entity, contact);
      }
    };

    ContactCallback.prototype.enter = function(contact) {
      if (this.enterCallback != null) {
        return this.enterCallback.call(void 0, this.entity, contact);
      }
    };

    return ContactCallback;

  })();

  Pinball.Core.EntityContactListener = (function() {
    function EntityContactListener(game, entity) {
      this.onEndContact = __bind(this.onEndContact, this);
      this.onBeginContact = __bind(this.onBeginContact, this);
      this.game = game;
      this.entity = entity;
      this.callbacks = [];
      this.game.physics.p2.world.on("beginContact", this.onBeginContact);
      this.game.physics.p2.world.on("endContact", this.onEndContact);
    }

    EntityContactListener.prototype["with"] = function(entity, callbackEnter, callbackLeave) {
      var callback, shape, shapes, _i, _len, _results;
      shapes = entity.getCollisionShapes();
      _results = [];
      for (_i = 0, _len = shapes.length; _i < _len; _i++) {
        shape = shapes[_i];
        callback = new Pinball.Core.ContactCallback(entity, callbackEnter, callbackLeave);
        _results.push(this.callbacks[shape.id] = callback);
      }
      return _results;
    };

    EntityContactListener.prototype.onBeginContact = function(contact) {
      var callback, shape;
      shape = this.identifyOpposite(contact);
      if (shape != null) {
        callback = this.findCallbackForShape(shape);
      }
      if (callback != null) {
        return callback.enter(contact);
      }
    };

    EntityContactListener.prototype.onEndContact = function(contact) {
      var callback, shape;
      shape = this.identifyOpposite(contact);
      if (shape != null) {
        callback = this.findCallbackForShape(shape);
      }
      if (callback != null) {
        return callback.leave(contact);
      }
    };

    EntityContactListener.prototype.identifyOpposite = function(contact) {
      if (this.entity.hasShape(contact.shapeB)) {
        return contact.shapeA;
      }
      if (this.entity.hasShape(contact.shapeA)) {
        return contact.shapeB;
      }
    };

    EntityContactListener.prototype.findCallbackForShape = function(shape) {
      return this.callbacks[shape.id];
    };

    return EntityContactListener;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Base.ComponentActions = (function() {
    function ComponentActions() {
      this.run = __bind(this.run, this);
      this.actions = [];
    }

    ComponentActions.prototype.addAction = function(action) {
      return this.actions.push(action);
    };

    ComponentActions.prototype.run = function(forState) {
      var action, actions, _i, _len, _results;
      actions = _(this.actions).where({
        state: forState
      });
      _results = [];
      for (_i = 0, _len = actions.length; _i < _len; _i++) {
        action = actions[_i];
        _results.push(action.run());
      }
      return _results;
    };

    return ComponentActions;

  })();

}).call(this);
(function() {
  Pinball.Base.ComponentEvents = (function() {
    function ComponentEvents(entity) {
      this.entity = entity;
      this.events = [];
    }

    ComponentEvents.prototype.register = function(event, callback) {
      return this.events[event] = callback;
    };

    ComponentEvents.prototype.trigger = function(event) {
      if (this.events[event]) {
        return this.events[event].apply(this.entity);
      }
    };

    return ComponentEvents;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Base.ComponentLightable = (function() {
    function ComponentLightable(game, sprite, options) {
      this.toggleLight = __bind(this.toggleLight, this);
      this.handleBlinkComplete = __bind(this.handleBlinkComplete, this);
      this.blinkCompleted = new Phaser.Signal();
      this.game = game;
      this.sprite = sprite;
      this._frame = options.frame;
      this._frameLightened = options.frameLightened;
      this._alphaLightened = options.alphaLightened || 1;
      this._alpha = options.alpha || 0.5;
      this.timer = this.game.time.create(false);
      this.timer.onComplete.add(this.handleBlinkComplete);
      this.powered = false;
      this.lightOff();
    }

    ComponentLightable.prototype.handleBlinkComplete = function() {
      return this.blinkCompleted.dispatch();
    };

    ComponentLightable.prototype.lightOn = function() {
      this.powered = true;
      if (this._frameLightened) {
        this.sprite.frameName = this._frameLightened;
      }
      return this.sprite.alpha = this._alphaLightened;
    };

    ComponentLightable.prototype.lightOff = function() {
      this.powered = false;
      if (this._frameLightened) {
        this.sprite.frameName = this._frame;
      }
      return this.sprite.alpha = this._alpha;
    };

    ComponentLightable.prototype.stopBlink = function() {
      return this.timer.stop(true);
    };

    ComponentLightable.prototype.blink = function(delay, offset, count) {
      if (delay == null) {
        delay = 500;
      }
      if (offset == null) {
        offset = 0;
      }
      if (count == null) {
        count = 3;
      }
      count = count * 2;
      this.timer.stop(true);
      if (count > 0) {
        this.timer.repeat(delay, count, this.toggleLight);
      } else {
        this.timer.loop(delay, this.toggleLight);
      }
      return this.timer.start(offset);
    };

    ComponentLightable.prototype.toggleLight = function() {
      if (this.powered) {
        return this.lightOff();
      } else {
        return this.lightOn();
      }
    };

    return ComponentLightable;

  })();

}).call(this);
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
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.ComponentSprite = (function(_super) {
    __extends(ComponentSprite, _super);

    function ComponentSprite(game) {
      ComponentSprite.__super__.constructor.call(this, game);
    }

    return ComponentSprite;

  })(Phaser.Sprite);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Core.StateableEntity = (function() {
    function StateableEntity(states) {
      this.runActions = __bind(this.runActions, this);
      this.handleTransition = __bind(this.handleTransition, this);
      this.actions = [];
      this.states = states;
      this.initFSM();
    }

    StateableEntity.prototype.trigger = function(event, force) {
      if (force) {
        switch (event) {
          case 'endball':
            return this.fsm.transition('ballout');
          case 'newball':
            return this.fsm.transition('idle');
        }
      } else {
        return this.fsm.handle(event);
      }
    };

    StateableEntity.prototype.registerAction = function(action) {
      return this.actions.push(action);
    };

    StateableEntity.prototype.initFSM = function() {
      this.fsm = new machina.Fsm({
        initialState: "ballout",
        states: this.getStates()
      });
      this.fsm.on('run.actions', this.runActions);
      return this.fsm.on('transition', this.handleTransition);
    };

    StateableEntity.prototype.handleTransition = function(options) {
      var newState;
      newState = options.toState;
      console.log('handleTransition', newState);
      return this.runActions(newState);
    };

    StateableEntity.prototype.runActions = function(forState) {
      var action, actions, _i, _len, _results;
      actions = _(this.actions).where({
        state: forState
      });
      _results = [];
      for (_i = 0, _len = actions.length; _i < _len; _i++) {
        action = actions[_i];
        _results.push(action.run());
      }
      return _results;
    };

    StateableEntity.prototype.getStates = function() {
      return {
        "ballout": {
          "newball": "idle"
        },
        "idle": {
          "hit": "hitted"
        },
        "hitted": {},
        "lightened": {}
      };
    };

    return StateableEntity;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.Bumper = (function(_super) {
    __extends(Bumper, _super);

    function Bumper(game, options, material) {
      this.handlePowerOff = __bind(this.handlePowerOff, this);
      this.handlePowerOn = __bind(this.handlePowerOn, this);
      this.switchoff = __bind(this.switchoff, this);
      this.beforeSwitchOn = __bind(this.beforeSwitchOn, this);
      Bumper.__super__.constructor.call(this, game, options);
      this.physicsable.setMaterial(material);
      this.lightable = new Pinball.Base.ComponentLightable(this.game, this, _(options).extend({
        alpha: 1
      }));
      this.createFSM();
    }

    Bumper.prototype.getStateConfig = function() {
      return {
        initial: 'off',
        events: [
          {
            name: 'hit',
            from: '*',
            to: 'powered'
          }, {
            name: 'switchoff',
            from: 'powered',
            to: 'off'
          }
        ],
        callbacks: {
          onpowered: this.handlePowerOn,
          onoff: this.handlePowerOff,
          onbeforeswitchon: this.beforeSwitchOn
        }
      };
    };

    Bumper.prototype.getType = function() {
      return 'bumper';
    };

    Bumper.prototype.beforeSwitchOn = function() {
      if (this.fsm.current === 'powered') {
        return this.startTimer();
      }
    };

    Bumper.prototype.hit = function() {
      return this.fsm.hit();
    };

    Bumper.prototype.switchoff = function() {
      return this.fsm.switchoff();
    };

    Bumper.prototype.startTimer = function() {
      this.game.time.events.remove(this.timeout);
      return this.timeout = this.game.time.events.add(500, this.switchoff);
    };

    Bumper.prototype.handlePowerOn = function() {
      this.lightable.lightOn();
      return this.startTimer();
    };

    Bumper.prototype.handlePowerOff = function() {
      this.game.time.events.remove(this.timeout);
      delete this.timeout;
      return this.lightable.lightOff();
    };

    return Bumper;

  })(Pinball.Base.PinballEntity);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.FlipTarget = (function(_super) {
    __extends(FlipTarget, _super);

    function FlipTarget(game, options, material) {
      this.handleDisabled = __bind(this.handleDisabled, this);
      this.handleEnabled = __bind(this.handleEnabled, this);
      FlipTarget.__super__.constructor.call(this, game, options);
      this.createFSM();
    }

    FlipTarget.prototype.getStateConfig = function() {
      return {
        initial: 'disabled',
        error: function() {
          return console.log('bad event in fliptarget ignored');
        },
        events: [
          {
            name: 'turnoff',
            from: '*',
            to: 'disabled'
          }, {
            name: 'turnon',
            from: 'disabled',
            to: 'enabled'
          }, {
            name: 'hit',
            from: 'enabled',
            to: 'activated'
          }, {
            name: 'reset',
            from: '*',
            to: 'disabled'
          }
        ],
        callbacks: {
          onactivated: this.handleEnabled,
          ondisabled: this.handleDisabled
        }
      };
    };

    FlipTarget.prototype.getType = function() {
      return 'fliptarget';
    };

    FlipTarget.prototype.handleEnabled = function() {
      this.visible = false;
      return this.physicsable.setCollisionMask(Pinball.Bits.NOTHING);
    };

    FlipTarget.prototype.handleDisabled = function() {
      this.visible = true;
      return this.physicsable.setCollisionMask(Pinball.Bits.BALL);
    };

    return FlipTarget;

  })(Pinball.Base.PinballEntity);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.Hole = (function(_super) {
    __extends(Hole, _super);

    function Hole(game, options, material) {
      this.handleTeleporter = __bind(this.handleTeleporter, this);
      Hole.__super__.constructor.call(this, game, options);
      this.createFSM();
    }

    Hole.prototype.getType = function() {
      return 'hole';
    };

    Hole.prototype.getStateConfig = function() {
      return {
        initial: 'idle',
        error: function() {
          return console.log('wrong state in hole reqeusted');
        },
        events: [
          {
            name: 'turnoff',
            from: '*',
            to: 'disabled'
          }, {
            name: 'turnon',
            from: '*',
            to: 'enabled'
          }, {
            name: 'hit',
            from: ['idle', 'enabled'],
            to: 'teleporter'
          }, {
            name: 'hit',
            from: 'receiver',
            to: 'idle'
          }, {
            name: 'receive',
            from: '*',
            to: 'receiver'
          }, {
            name: 'reset',
            from: ['*'],
            to: 'idle'
          }
        ],
        callbacks: {
          onteleporter: this.handleTeleporter
        }
      };
    };

    Hole.prototype.resetHole = function() {
      return this.fsm.reset();
    };

    Hole.prototype.receive = function() {
      return this.fsm.receive();
    };

    Hole.prototype.handleTeleporter = function() {
      return this.fsm.reset();
    };

    return Hole;

  })(Pinball.Base.PinballEntity);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.Light = (function(_super) {
    __extends(Light, _super);

    function Light(game, options) {
      this.handlePowerOn = __bind(this.handlePowerOn, this);
      this.handlePowerOff = __bind(this.handlePowerOff, this);
      this.handleBlinking = __bind(this.handleBlinking, this);
      this.handleHelloBlink = __bind(this.handleHelloBlink, this);
      this.onBlinkCompleted = __bind(this.onBlinkCompleted, this);
      Light.__super__.constructor.call(this, game, options);
      this.angle = options.angle || 0;
      this.blinkCompleted = new Phaser.Signal();
      this.lightable = new Pinball.Base.ComponentLightable(this.game, this, options);
      this.lightable.blinkCompleted.add(this.onBlinkCompleted);
      this.createFSM();
    }

    Light.prototype.onBlinkCompleted = function() {
      this.fsm.switchoff();
      return this.blinkCompleted.dispatch();
    };

    Light.prototype.getStateConfig = function() {
      return {
        initial: this.options.initialState || 'off',
        events: [
          {
            name: 'switchon',
            from: ['blinking', 'off'],
            to: 'powered'
          }, {
            name: 'switchoff',
            from: ['powered', 'blinking'],
            to: 'off'
          }, {
            name: 'blink',
            from: '*',
            to: 'blinking'
          }, {
            name: 'helloblink',
            from: 'off',
            to: 'helloblinking'
          }, {
            name: 'switchoff',
            from: '*',
            to: 'off'
          }
        ],
        callbacks: {
          onpowered: this.handlePowerOn,
          onoff: this.handlePowerOff,
          onbeforeblink: this.handleBlinking,
          onhelloblinking: this.handleHelloBlink
        }
      };
    };

    Light.prototype.handleHelloBlink = function() {
      return this.lightable.blink(250, Math.random() * 150, 3);
    };

    Light.prototype.isOff = function() {
      return this.fsm.is('off');
    };

    Light.prototype.getType = function() {
      return 'light';
    };

    Light.prototype.powerOn = function() {
      if (this.fsm.can('switchon')) {
        return this.fsm.switchon();
      }
    };

    Light.prototype.powerOff = function() {
      if (this.fsm.can('switchoff')) {
        return this.fsm.switchoff();
      }
    };

    Light.prototype.blink = function(delay, offset, count) {
      if (delay == null) {
        delay = 500;
      }
      if (offset == null) {
        offset = 0;
      }
      if (count == null) {
        count = 0;
      }
      return this.fsm.blink(delay, offset, count);
    };

    Light.prototype.handleBlinking = function(name, oldState, newState, delay, offset, count) {
      return this.lightable.blink(delay, offset, count);
    };

    Light.prototype.handlePowerOff = function() {
      this.lightable.stopBlink();
      return this.lightable.lightOff();
    };

    Light.prototype.handlePowerOn = function() {
      this.lightable.stopBlink();
      return this.lightable.lightOn();
    };

    return Light;

  })(Pinball.Base.PinballEntity);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.LightGroup = (function(_super) {
    __extends(LightGroup, _super);

    function LightGroup(game, options) {
      this.handleLightBlinkCompleted = __bind(this.handleLightBlinkCompleted, this);
      this.handlePowerOn = __bind(this.handlePowerOn, this);
      this.handlePowerOff = __bind(this.handlePowerOff, this);
      this.handleHelloBlink = __bind(this.handleHelloBlink, this);
      this.handleBlinking = __bind(this.handleBlinking, this);
      this.powerOff = __bind(this.powerOff, this);
      this.powerOn = __bind(this.powerOn, this);
      this.handleLoopBlink = __bind(this.handleLoopBlink, this);
      LightGroup.__super__.constructor.call(this, game, options);
      this.activeLights = 0;
      this.options = options;
      this.lights = [];
      this.createFSM();
    }

    LightGroup.prototype.getStateConfig = function() {
      return {
        initial: 'off',
        events: [
          {
            name: 'switchon',
            from: '*',
            to: 'powered'
          }, {
            name: 'switchoff',
            from: '*',
            to: 'off'
          }, {
            name: 'helloblink',
            from: 'off',
            to: 'helloblinking'
          }, {
            name: 'blink',
            from: 'off',
            to: 'blinking'
          }, {
            name: 'alwaysblink',
            from: '*',
            to: 'loopblinking'
          }
        ],
        callbacks: {
          onpowered: this.handlePowerOn,
          onoff: this.handlePowerOff,
          onhelloblinking: this.handleHelloBlink,
          onloopblinking: this.handleLoopBlink,
          onblinking: this.handleBlinking
        }
      };
    };

    LightGroup.prototype.handleLoopBlink = function() {
      return this.blinkLights('line', 0);
    };

    LightGroup.prototype.getLight = function(id) {
      return _.chain(this.lights).where({
        _id: id
      }).first().value();
    };

    LightGroup.prototype.powerOn = function() {
      return this.fsm.switchon();
    };

    LightGroup.prototype.powerOff = function() {
      if (this.fsm.can('switchoff')) {
        return this.fsm.switchoff();
      }
    };

    LightGroup.prototype.blink = function(patternId, count) {
      return this.fsm.blink(patternId, count);
    };

    LightGroup.prototype.handleBlinking = function() {
      return this.blinkLights('line', 3);
    };

    LightGroup.prototype.handleHelloBlink = function() {
      return this.blinkLights('line', 3);
    };

    LightGroup.prototype.blinkLights = function(pattern, count) {
      var delay, lightPattern;
      lightPattern = new Pinball.LightPattern(this.options.patterns[pattern]);
      delay = lightPattern.getDelay();
      return _(this.lights).each(function(light, index) {
        return light.blink(delay, lightPattern.getOffset(index), count);
      });
    };

    LightGroup.prototype.handlePowerOff = function(event, from, to) {
      if (from === 'blinking') {
        return;
      }
      return _(this.lights).each(function(light) {
        return light.powerOff();
      });
    };

    LightGroup.prototype.handlePowerOn = function() {
      return _(this.lights).each(function(light) {
        return light.powerOn();
      });
    };

    LightGroup.prototype.addLights = function(lights) {
      var light, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = lights.length; _i < _len; _i++) {
        light = lights[_i];
        _results.push(this.addLight(light));
      }
      return _results;
    };

    LightGroup.prototype.addLight = function(light) {
      this.lights.push(light);
      light.blinkCompleted.add(this.handleLightBlinkCompleted);
      return this.add(light);
    };

    LightGroup.prototype.handleLightBlinkCompleted = function() {
      if (this.activeLightsCount() === 0) {
        return this.powerOff();
      }
    };

    LightGroup.prototype.activeLightsCount = function() {
      return _(this.lights).reduce((function(memo, light) {
        return memo + (light.isOff() ? 0 : 1);
      }), 0);
    };

    LightGroup.prototype.getType = function() {
      return 'lightgroup';
    };

    return LightGroup;

  })(Pinball.Base.PinballGroup);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.Rollover = (function(_super) {
    __extends(Rollover, _super);

    function Rollover(game, options, material) {
      Rollover.__super__.constructor.call(this, game, options);
      this.createFSM();
    }

    Rollover.prototype.getStateConfig = function() {
      return {
        initial: 'off',
        events: [
          {
            name: 'hit',
            from: '*',
            to: 'sunken'
          }, {
            name: 'turnoff',
            from: "*",
            to: 'off'
          }, {
            name: 'disable',
            from: '*',
            to: 'disabled'
          }
        ]
      };
    };

    Rollover.prototype.getType = function() {
      return 'rollover';
    };

    return Rollover;

  })(Pinball.Base.PinballEntity);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.Slingshot = (function(_super) {
    __extends(Slingshot, _super);

    function Slingshot(game, options, material) {
      this.handleHit = __bind(this.handleHit, this);
      Slingshot.__super__.constructor.call(this, game, options);
      this.physicsable.setMaterial(material, 'rubber');
      this.createFSM();
    }

    Slingshot.prototype.getStateConfig = function() {
      return {
        initial: 'off',
        events: [
          {
            name: 'hit',
            from: '*',
            to: 'powered'
          }, {
            name: 'reset',
            from: 'powered',
            to: 'off'
          }
        ],
        callbacks: {
          onpowered: this.handleHit
        }
      };
    };

    Slingshot.prototype.handleHit = function() {
      return this.fsm.reset();
    };

    Slingshot.prototype.getCollisionShapes = function() {
      return this.physicsable.getCollisionShapes(['rubber']);
    };

    Slingshot.prototype.hit = function(a, b, c) {
      return this.fsm.hit();
    };

    Slingshot.prototype.getType = function() {
      return 'slingshot';
    };

    return Slingshot;

  })(Pinball.Base.PinballEntity);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.Target = (function(_super) {
    __extends(Target, _super);

    function Target(game, options, material) {
      Target.__super__.constructor.call(this, game, _({
        debug: false
      }).extend(options));
      this.createFSM();
    }

    Target.prototype.getStateConfig = function() {
      return {
        initial: 'idle',
        error: function() {
          return console.log('bad event in target ignored');
        },
        events: [
          {
            name: 'turnoff',
            from: '*',
            to: 'disabled'
          }, {
            name: 'turnon',
            from: 'disabled',
            to: 'enabled'
          }, {
            name: 'hit',
            from: 'enabled',
            to: 'activated'
          }, {
            name: 'complete',
            from: 'activated',
            to: 'completed'
          }, {
            name: 'reset',
            from: '*',
            to: 'disabled'
          }
        ]
      };
    };

    Target.prototype.getType = function() {
      return 'target';
    };

    return Target;

  })(Pinball.Base.PinballEntity);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.Trigger = (function(_super) {
    __extends(Trigger, _super);

    function Trigger(game, options, material) {
      Trigger.__super__.constructor.call(this, game, options);
      this.physicsable = new Pinball.Base.ComponentPhysics(this.game, options);
      this.collidable = new Pinball.Core.CollideableEntity(this, this.physicsable.getCollisionShapes());
      this.createFSM();
    }

    Trigger.prototype.getStateConfig = function() {
      return {
        initial: 'disabled',
        events: [
          {
            name: 'turnoff',
            from: '*',
            to: 'enabled'
          }, {
            name: 'turnon',
            from: ['activated', 'disabled'],
            to: 'enabled'
          }, {
            name: 'hit',
            from: 'enabled',
            to: 'activated'
          }, {
            name: 'reset',
            from: '*',
            to: 'disabled'
          }
        ]
      };
    };

    Trigger.prototype.getType = function() {
      return 'trigger';
    };

    return Trigger;

  })(Pinball.Base.PinballObject);

}).call(this);
(function() {
  Pinball.Core.EntityList = (function() {
    function EntityList() {
      this.list = {};
      this.listByType = {};
    }

    EntityList.prototype.get = function(id) {
      return this.list[id];
    };

    EntityList.prototype.find = function(options) {
      return _(this.list).where(options);
    };

    EntityList.prototype.each = function(fn) {
      return _(this.list).each(fn);
    };

    EntityList.prototype.getAll = function() {
      var entity, key, list, _ref;
      list = [];
      _ref = this.list;
      for (key in _ref) {
        entity = _ref[key];
        list.push(entity);
      }
      return list;
    };

    EntityList.prototype.register = function(entity) {
      var id, type;
      id = entity.getID();
      type = entity.getType();
      this.list[id] = entity;
      this.listByType[type] = this.listByType[type] || [];
      return this.listByType[type].push(entity);
    };

    EntityList.prototype.getAllFromType = function(type) {
      return this.listByType[type];
    };

    return EntityList;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Gameplay = (function() {
    function Gameplay(game, machine) {
      this.addAction = __bind(this.addAction, this);
      this.handleMissionEnded = __bind(this.handleMissionEnded, this);
      this.handleMissionStarted = __bind(this.handleMissionStarted, this);
      this.game = game;
      this.machine = machine;
      this.playfield = this.machine.playfield;
      this.gameModel = this.machine.gameModel;
    }

    Gameplay.prototype.create = function() {
      this.stateTransitions = new Pinball.Logic.StateTransitions(this.game, this.playfield, this.gameModel, this);
      this.stateTransitions.parse(Pinball.LOGIC.states);
      this.actionFactory = new Pinball.Logic.ActionFactory(this.game, this.machine);
      this.actionList = new Pinball.ActionList(Pinball.LOGIC.actions);
      this.actionList.each(this.addAction);
      this.missions = new Pinball.Logic.MissionManager(this.game, this.machine);
      this.missions.missionStartedSignal.add(this.handleMissionStarted);
      return this.missions.missionEndedSignal.add(this.handleMissionEnded);
    };

    Gameplay.prototype.handleMissionStarted = function(mission) {};

    Gameplay.prototype.handleMissionEnded = function(mission) {};

    Gameplay.prototype.startMission = function() {
      return this.missions.startRandom();
    };

    Gameplay.prototype.startGame = function() {
      this.gameModel.startGame();
      this.stateTransitions.trigger('newgame');
      return this.newBall();
    };

    Gameplay.prototype.addAction = function(actionData) {
      var action, entity;
      action = this.actionFactory.create(actionData);
      entity = this.playfield.get(action.target);
      if (entity && entity.actionable) {
        return entity.actionable.addAction(action);
      }
    };

    Gameplay.prototype.newMission = function() {
      return this.stateTransitions.trigger('newmission');
    };

    Gameplay.prototype.endedMission = function() {
      return this.stateTransitions.trigger('endedmisison');
    };

    Gameplay.prototype.newBall = function() {
      var ball, entities;
      ball = this.playfield.get('ball');
      ball.add();
      entities = this.playfield.getAll();
      this.gameModel.ballActive(true);
      return this.stateTransitions.trigger('newball');
    };

    Gameplay.prototype.endBall = function() {
      var ball;
      this.missions.stop();
      ball = this.playfield.get('ball');
      ball.remove();
      this.gameModel.ballActive(false);
      this.stateTransitions.trigger('endball');
      return this.game.time.events.add(500, (function(_this) {
        return function() {
          return _this.newBall();
        };
      })(this));
    };

    Gameplay.prototype.ballHit = function(entity) {
      if (entity.eventable != null) {
        return entity.eventable.trigger('hit');
      }
    };

    Gameplay.prototype.triggerAll = function(event) {
      var entities, entity, _i, _len, _results;
      entities = this.playfield.getAll();
      _results = [];
      for (_i = 0, _len = entities.length; _i < _len; _i++) {
        entity = entities[_i];
        if (entity.eventable != null) {
          _results.push(entity.eventable.trigger(event));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Gameplay;

  })();

}).call(this);
(function() {
  window.Pinball = {
    Actions: {},
    Logic: {},
    Base: {},
    Core: {},
    Factories: {},
    Models: {},
    Screens: {},
    Missions: {},
    Entities: {},
    Machine: {},
    Store: {},
    Controller: {}
  };

}).call(this);
(function() {
  Pinball.Core.Materials = (function() {
    function Materials(game) {
      this.game = game;
      this.world = this.game.physics.p2;
      this.createMaterials();
      this.createBumperBallContact();
      this.createSlingshotBallContact();
      this.createFlipperBallContact();
    }

    Materials.prototype.createMaterials = function() {
      this.ballMaterial = this.game.physics.p2.createMaterial('ball');
      this.flipperMaterial = this.game.physics.p2.createMaterial('flipper');
      this.bumperMaterial = this.game.physics.p2.createMaterial('bumper');
      return this.slingshotMaterial = this.game.physics.p2.createMaterial('slingshot');
    };

    Materials.prototype.createBumperBallContact = function() {
      this.bumperBallContact = this.world.createContactMaterial(this.bumperMaterial, this.ballMaterial);
      this.bumperBallContact.friction = 1;
      return this.bumperBallContact.restitution = 1.2;
    };

    Materials.prototype.createSlingshotBallContact = function() {
      this.slingshotBallContact = this.world.createContactMaterial(this.slingshotMaterial, this.ballMaterial);
      this.slingshotBallContact.friction = 0;
      return this.slingshotBallContact.restitution = 1.8;
    };

    Materials.prototype.createFlipperBallContact = function() {
      this.flipperBallContact = this.world.createContactMaterial(this.flipperMaterial, this.ballMaterial);
      this.flipperBallContact.friction = 1;
      return this.flipperBallContact.restitution = 0;
    };

    return Materials;

  })();

}).call(this);
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
(function() {
  Pinball.Bits = {
    NOTHING: 0,
    TABLE: 0x1,
    BALL: 0x2,
    RAMP_UPPER: 0x4,
    RAMP_LOWER: 0x8,
    RAMP_CENTER: 0x10,
    FLIPPER: 0x20,
    RAMP_ACTIVE: 0x40,
    RAMP_INACTIVE: 0x80,
    groups: {
      TABLE: function() {
        return Pinball.Bits.TABLE | Pinball.Bits.FLIPPER | Pinball.Bits.RAMP_INACTIVE;
      },
      RAMP_LOWER: function() {
        return Pinball.Bits.RAMP_ACTIVE | Pinball.Bits.RAMP_LOWER;
      },
      RAMP_UPPER: function() {
        return Pinball.Bits.RAMP_ACTIVE | Pinball.Bits.RAMP_UPPER;
      },
      RAMP_CENTER: function() {
        return Pinball.Bits.RAMP_ACTIVE | Pinball.Bits.RAMP_CENTER;
      }
    }
  };

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Playfield = (function(_super) {
    __extends(Playfield, _super);

    function Playfield(game) {
      Playfield.__super__.constructor.call(this, game);
      this.build();
    }

    Playfield.prototype.build = function() {
      this.entities = new Pinball.Core.EntityList();
      return this.factory = new Pinball.Factories.ComponentFactory(this.game);
    };

    Playfield.prototype.register = function(entity) {
      entity.playfield = this;
      return this.entities.register(entity);
    };

    Playfield.prototype.createPlayfield = function(data) {
      this.buildBase();
      this.buildEntities(data);
      this.buildMissionProgress();
      this.bringToTop(this.ball);
      this.bringToTop(this.rampGroup);
      return this.bringToTop(this.controls);
    };

    Playfield.prototype.buildBase = function() {
      this.buildSurface();
      this.buildBall();
      this.buildAutoPlunger();
      this.buildDisplay();
      this.buildRamp();
      return this.buildControls();
    };

    Playfield.prototype.getGround = function() {
      return this.ground;
    };

    Playfield.prototype.get = function(id) {
      return this.entities.get(id);
    };

    Playfield.prototype.getMultiple = function(ids) {
      return _(ids).map((function(_this) {
        return function(id) {
          return _this.get(id);
        };
      })(this));
    };

    Playfield.prototype.getAll = function() {
      return this.entities.getAll();
    };

    Playfield.prototype.getAllFromType = function(type) {
      return this.entities.getAllFromType(type);
    };

    Playfield.prototype.moveBallOverRamp = function() {
      if (this.getIndex(this.ball) < this.getIndex(this.rampGroup)) {
        return this.swap(this.ball, this.rampGroup);
      }
    };

    Playfield.prototype.moveBallBehindRamp = function() {
      if (this.getIndex(this.ball) > this.getIndex(this.rampGroup)) {
        return this.swap(this.ball, this.rampGroup);
      }
    };

    Playfield.prototype.update = function() {
      return this.controls.update();
    };

    Playfield.prototype.buildSurface = function() {
      this.ground = new p2.Body();
      this.game.physics.p2.world.addBody(this.ground);
      this.surface = new Pinball.Entities.Surface(this.game, this.game.world.centerX, this.game.world.centerY);
      this.register(this.surface);
      return this.add(this.surface);
    };

    Playfield.prototype.buildDisplay = function() {
      this.display = new Pinball.Machine.Display(this.game);
      this.register(this.display);
      return this.add(this.display);
    };

    Playfield.prototype.buildMissionProgress = function() {
      var data;
      data = _.chain(Pinball.DATA.lightgroups).where({
        name: 'missionProgressLights'
      }).first().value();
      this.missionProgress = new Pinball.Entities.MissionProgress(this.game, data);
      this.missionProgress.addLights(this.getMultiple(data.lights));
      this.register(this.missionProgress);
      return this.add(this.missionProgress);
    };

    Playfield.prototype.buildRamp = function() {
      this.rampGroup = this.game.add.group(this);
      this.ramp = new Pinball.Entities.Ramp(this.game, 496, 473, this.ball);
      this.rampGroup.add(this.ramp);
      return this.register(this.ramp);
    };

    Playfield.prototype.buildBall = function() {
      this.ball = this.factory.createBall();
      this.register(this.ball);
      return this.add(this.ball);
    };

    Playfield.prototype.buildAutoPlunger = function() {
      this.autoPlunger = new Pinball.Entities.AutoPlunger(this.game, this.ground);
      this.register(this.autoPlunger);
      return this.add(this.autoPlunger);
    };

    Playfield.prototype.buildControls = function() {
      this.controls = new Pinball.Controls(this.game, this.ground, this.factory.materials.flipperMaterial);
      this.register(this.controls.flippers.flipperLeft);
      this.register(this.controls.flippers.flipperRight);
      this.register(this.controls.flippers.flipperRamp);
      this.register(this.controls.plunger);
      return this.add(this.controls);
    };

    Playfield.prototype.buildEntities = function(data) {
      var entities, entity, entityData, _i, _len, _results;
      entities = _.flatten([data.objects, data.lights, data.lightgroups]);
      _results = [];
      for (_i = 0, _len = entities.length; _i < _len; _i++) {
        entityData = entities[_i];
        if (entityData.useCustomClass) {
          continue;
        }
        entity = this.factory.create(entityData);
        this.register(entity);
        if (entity.options.onramp) {
          _results.push(this.rampGroup.add(entity));
        } else if (entity instanceof Phaser.Sprite) {
          _results.push(this.add(entity));
        } else if (entity instanceof Phaser.Group) {
          _results.push(this.add(entity));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Playfield;

  })(Phaser.Group);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.ThemeLoader = (function() {
    function ThemeLoader(game, machine) {
      this.loadCompleted = __bind(this.loadCompleted, this);
      this.machine = machine;
      this.game = game;
      this.init();
      this.build();
    }

    ThemeLoader.prototype.init = function() {
      this.themes = {};
      this.loader = new Phaser.Loader(this.game);
      this.loader.onLoadComplete.add(this.loadCompleted);
      this.register(new Pinball.ThemeDefault());
      this.register(new Pinball.ThemeParty());
      return this.register(new Pinball.ThemeBeach());
    };

    ThemeLoader.prototype.build = function() {
      this.preloadScreen = new Pinball.ThemeLoadScreen(this.game);
      return this.game.world.addChild(this.preloadScreen);
    };

    ThemeLoader.prototype.load = function(id) {
      var theme;
      theme = _.first(_.where(this.themes, {
        id: id
      }));
      this.loader.image('table', theme.table);
      this.loader.image('ramp', theme.ramp);
      this.loader.atlasJSONHash('sprites', theme.sprite.texture, theme.sprite.atlas);
      return this.preloadScreen.captureFrame(this.machine.playfield).show().then((function(_this) {
        return function() {
          return _this.loader.start();
        };
      })(this));
    };

    ThemeLoader.prototype.register = function(theme) {
      return this.themes[theme.id] = theme;
    };

    ThemeLoader.prototype.loadCompleted = function() {
      this.refreshAssets();
      return this.preloadScreen.hide();
    };

    ThemeLoader.prototype.refreshAssets = function() {
      var ramp, spriteData, surface;
      spriteData = this.game.cache.getFrameData('sprites');
      _(spriteData._frames).each((function(_this) {
        return function(frame) {
          var sprite;
          sprite = _this.machine.playfield.entities.find({
            key: 'sprites',
            frameName: frame.name
          });
          return _(sprite).each(function(sprite) {
            if (sprite != null) {
              return sprite.loadTexture('sprites', frame.name);
            }
          });
        };
      })(this));
      surface = this.machine.playfield.get('surface');
      surface.loadTexture('table');
      ramp = this.machine.playfield.get('ramp');
      return ramp.loadTexture('ramp');
    };

    return ThemeLoader;

  })();

}).call(this);
(function() {
  Pinball.Theme = (function() {
    function Theme(options) {
      this.id = options.id;
      this.sprite = options.sprite;
      this.table = options.table;
      this.ramp = options.ramp;
    }

    return Theme;

  })();

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.ThemeBeach = (function(_super) {
    __extends(ThemeBeach, _super);

    function ThemeBeach() {
      ThemeBeach.__super__.constructor.call(this, {
        id: 'beach',
        sprite: {
          texture: 'gameassets/themes/beach.png',
          atlas: 'gameassets/themes/beach.json'
        },
        table: 'gameassets/themes/beach-images/table.png',
        ramp: 'gameassets/themes/beach-images/ramp.png'
      });
    }

    return ThemeBeach;

  })(Pinball.Theme);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.ThemeDefault = (function(_super) {
    __extends(ThemeDefault, _super);

    function ThemeDefault() {
      ThemeDefault.__super__.constructor.call(this, {
        id: 'default',
        sprite: {
          texture: 'gameassets/themes/default.png',
          atlas: 'gameassets/themes/default.json'
        },
        table: 'gameassets/themes/default-images/table.png',
        ramp: 'gameassets/themes/default-images/ramp.png'
      });
    }

    return ThemeDefault;

  })(Pinball.Theme);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.ThemeParty = (function(_super) {
    __extends(ThemeParty, _super);

    function ThemeParty() {
      ThemeParty.__super__.constructor.call(this, {
        id: 'party',
        sprite: {
          texture: 'gameassets/themes/party.png',
          atlas: 'gameassets/themes/party.json'
        },
        table: 'gameassets/themes/party-images/table.png',
        ramp: 'gameassets/themes/party-images/ramp.png'
      });
    }

    return ThemeParty;

  })(Pinball.Theme);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.ThemeLoadScreen = (function(_super) {
    __extends(ThemeLoadScreen, _super);

    function ThemeLoadScreen(game) {
      this.fadeIn = __bind(this.fadeIn, this);
      this.fadeOut = __bind(this.fadeOut, this);
      ThemeLoadScreen.__super__.constructor.call(this, game);
      this.build();
    }

    ThemeLoadScreen.prototype.build = function() {
      this.snapshot = this.game.add.renderTexture(this.game.width, this.game.height, 'snapshot');
      this.snapshotImage = this.game.add.image(0, 0, this.snapshot);
      this.add(this.snapshotImage);
      this.waitImage = this.create(0, 0, 'table-wait');
      this.waitImage.alpha = 0.9;
      return this.visible = false;
    };

    ThemeLoadScreen.prototype.captureFrame = function(displayObject) {
      this.snapshot.render(displayObject);
      return this;
    };

    ThemeLoadScreen.prototype.show = function() {
      return this.fadeIn();
    };

    ThemeLoadScreen.prototype.hide = function() {
      return Q.delay(250).then(this.fadeOut);
    };

    ThemeLoadScreen.prototype.fadeOut = function() {
      var deferred, tweenOut;
      deferred = Q.defer();
      tweenOut = this.game.add.tween(this).to({
        alpha: 0
      }, 500).start();
      tweenOut.onComplete.addOnce((function(_this) {
        return function() {
          _this.visible = false;
          return deferred.resolve();
        };
      })(this));
      return deferred.promise;
    };

    ThemeLoadScreen.prototype.fadeIn = function() {
      var deferred, tweenIn;
      deferred = Q.defer();
      this.visible = true;
      this.alpha = 0;
      tweenIn = this.game.add.tween(this).to({
        alpha: 1
      }, 500).start();
      tweenIn.onComplete.addOnce(deferred.resolve);
      return deferred.promise;
    };

    return ThemeLoadScreen;

  })(Phaser.Group);

}).call(this);



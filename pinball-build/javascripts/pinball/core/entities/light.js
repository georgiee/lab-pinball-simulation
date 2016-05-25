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

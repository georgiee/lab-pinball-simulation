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

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

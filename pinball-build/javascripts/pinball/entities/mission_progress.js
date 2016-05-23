(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.MissionProgress = (function(_super) {
    __extends(MissionProgress, _super);

    function MissionProgress(game, options) {
      this.onOverview = __bind(this.onOverview, this);
      MissionProgress.__super__.constructor.call(this, game, options);
      this.x = 230;
      this.y = 570;
    }

    MissionProgress.prototype.getStateConfig = function() {
      return {
        initial: 'off',
        events: [
          {
            name: 'switchon',
            from: '*',
            to: 'powered'
          }, {
            name: 'switchoff',
            from: 'on',
            to: 'off'
          }, {
            name: 'switchoff',
            from: ['blinking', 'helloblinking'],
            to: 'overview'
          }, {
            name: 'helloblink',
            from: 'off',
            to: 'helloblinking'
          }, {
            name: 'blink',
            from: 'off',
            to: 'blinking'
          }
        ],
        callbacks: {
          onpowered: this.handlePowerOn,
          onoff: this.handlePowerOff,
          onhelloblinking: this.handleHelloBlink,
          onblinking: this.handleBlinking,
          onoverview: this.onOverview
        }
      };
    };

    MissionProgress.prototype.onOverview = function() {
      var light;
      light = this.getLight('missionLight1');
      light.powerOn();
      light = this.getLight('missionLight3');
      light.powerOn();
      light = this.getLight('missionLight4');
      return light.powerOn();
    };

    return MissionProgress;

  })(Pinball.Base.LightGroup);

}).call(this);

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

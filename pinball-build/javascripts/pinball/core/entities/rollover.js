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

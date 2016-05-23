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

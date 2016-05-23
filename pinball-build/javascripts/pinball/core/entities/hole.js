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

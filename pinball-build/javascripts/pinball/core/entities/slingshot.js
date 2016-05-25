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

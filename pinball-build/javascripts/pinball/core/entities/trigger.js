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

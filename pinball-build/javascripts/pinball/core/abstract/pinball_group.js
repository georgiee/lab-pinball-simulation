(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.PinballGroup = (function(_super) {
    __extends(PinballGroup, _super);

    function PinballGroup(game, options) {
      if (options == null) {
        options = {};
      }
      PinballGroup.__super__.constructor.call(this, game);
      this._id = options.name;
      this.createFSM();
    }

    PinballGroup.prototype.createFSM = function() {
      return this.fsm = StateMachine.create(this.getStateConfig());
    };

    PinballGroup.prototype.transition = function(event) {
      if (this.fsm.can(event)) {
        return this.fsm[event]();
      }
    };

    PinballGroup.prototype.getStateConfig = function() {
      return {};
    };

    PinballGroup.prototype.getType = function() {
      return 'pinball_group';
    };

    PinballGroup.prototype.getID = function() {
      return this._id;
    };

    return PinballGroup;

  })(Phaser.Group);

}).call(this);

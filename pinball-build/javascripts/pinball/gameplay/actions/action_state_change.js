(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.StateChangeAction = (function(_super) {
    __extends(StateChangeAction, _super);

    function StateChangeAction(game, machine, options) {
      StateChangeAction.__super__.constructor.call(this, game, options);
      this.playfield = machine.playfield;
      this.transition = options.transition;
      this.stateOf = options.stateOf;
    }

    StateChangeAction.prototype.run = function() {
      var entity;
      entity = this.playfield.get(this.stateOf);
      return entity.transition(this.transition);
    };

    StateChangeAction.prototype.getType = function() {
      return 'stateChange';
    };

    return StateChangeAction;

  })(Pinball.Logic.ActionAbstract);

}).call(this);

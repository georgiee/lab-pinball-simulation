(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.DisplayAction = (function(_super) {
    __extends(DisplayAction, _super);

    function DisplayAction(game, machine, options) {
      DisplayAction.__super__.constructor.call(this, game, options);
      this.machine = machine;
      this.playfield = this.machine.playfield;
      this.display = this.playfield.get('display');
      this.message = options.message;
      this.blink = options.blink;
    }

    DisplayAction.prototype.run = function() {
      this.display.clear();
      this.display.setText(this.message);
      if (this.blink) {
        return this.display.blink(100);
      }
    };

    DisplayAction.prototype.getType = function() {
      return 'display';
    };

    return DisplayAction;

  })(Pinball.Logic.ActionAbstract);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.LightenAction = (function(_super) {
    __extends(LightenAction, _super);

    function LightenAction(game, gameModel, playfield, options) {
      LightenAction.__super__.constructor.call(this, game, options);
      this.playfield = playfield;
      this.gameModel = gameModel;
      this.light = options.light;
      this.lightState = options.lightState;
    }

    LightenAction.prototype.run = function() {
      this.lightEntity = this.playfield.get(this.light);
      switch (this.lightState) {
        case 'off':
          return this.lightEntity.powerOff();
        case 'on':
          return this.lightEntity.powerOn();
        case 'blink':
          return this.lightEntity.blink(150, 0, 0);
        case 'blinkgroup':
          return this.lightEntity.transition('alwaysblink');
      }
    };

    LightenAction.prototype.getType = function() {
      return 'lighten';
    };

    return LightenAction;

  })(Pinball.Logic.ActionAbstract);

}).call(this);

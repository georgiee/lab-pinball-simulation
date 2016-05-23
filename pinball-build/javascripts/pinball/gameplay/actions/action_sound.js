(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.SoundAction = (function(_super) {
    __extends(SoundAction, _super);

    function SoundAction(game, options) {
      SoundAction.__super__.constructor.call(this, game, options);
      this.soundID = options.soundID;
      this.soundEffect = game.add.audio(this.soundID);
    }

    SoundAction.prototype.run = function() {
      return this.soundEffect.play();
    };

    SoundAction.prototype.getType = function() {
      return 'sound';
    };

    return SoundAction;

  })(Pinball.Logic.ActionAbstract);

}).call(this);

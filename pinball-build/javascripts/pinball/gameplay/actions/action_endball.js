(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.EndBallAction = (function(_super) {
    __extends(EndBallAction, _super);

    function EndBallAction(game, gameplay, playfield, options) {
      EndBallAction.__super__.constructor.call(this, game, options);
      this.gameplay = gameplay;
    }

    EndBallAction.prototype.run = function() {
      return this.gameplay.endBall();
    };

    return EndBallAction;

  })(Pinball.Logic.ActionAbstract);

}).call(this);

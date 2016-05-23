(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.ScoreAction = (function(_super) {
    __extends(ScoreAction, _super);

    function ScoreAction(game, gameModel, options) {
      ScoreAction.__super__.constructor.call(this, game, options);
      this.gameModel = gameModel;
      this.score = options.score;
    }

    ScoreAction.prototype.run = function() {
      return this.gameModel.addScore(this.score);
    };

    ScoreAction.prototype.getType = function() {
      return 'score';
    };

    return ScoreAction;

  })(Pinball.Logic.ActionAbstract);

}).call(this);

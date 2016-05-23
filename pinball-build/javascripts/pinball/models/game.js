(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Models.Game = (function(_super) {
    __extends(Game, _super);

    function Game() {
      return Game.__super__.constructor.apply(this, arguments);
    }

    Game.BALL_PER_GAME = 3;

    Game.prototype.defaults = {
      started: false,
      ballActive: false,
      balls: 3,
      score: 0
    };

    Game.prototype.initialize = function() {};

    Game.prototype.addScore = function(score) {
      return this.set('score', this.get('score') + score);
    };

    Game.prototype.ballActive = function(value) {
      return this.set('ballActive', value);
    };

    Game.prototype.startGame = function() {
      this.set('balls', Pinball.Models.Game.BALL_PER_GAME);
      this.set('score', 0);
      this.set('ballActive', false);
      return this.set('started', true);
    };

    return Game;

  })(Backbone.Model);

}).call(this);

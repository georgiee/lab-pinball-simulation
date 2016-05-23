(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.App = (function(_super) {
    __extends(App, _super);

    function App() {
      this.handleScoreChanged = __bind(this.handleScoreChanged, this);
      return App.__super__.constructor.apply(this, arguments);
    }

    App.prototype.el = '#pinball-app';

    App.prototype.events = {
      'click .toggle-sound': 'toggleSound',
      'click .toggle-pause': 'togglePause'
    };

    App.prototype.initialize = function() {
      this.score = new Pinball.ScoreField({
        el: this.$('.score-value'),
        initialScore: 0
      });
      console.log('@score', this.score);
      this.game = new Pinball.Game(this.$el.find('#pinball-game').get(0));
      this.game.on('score.changed', this.handleScoreChanged);
      return this.game.start();
    };

    App.prototype.getInterface = function() {
      return this.game.game.externalInterface;
    };

    App.prototype.handleScoreChanged = function(newScore) {
      return this.score.set(newScore);
    };

    App.prototype.toggleSound = function() {
      this.game.toggleSound();
      return console.log('toggleSound');
    };

    App.prototype.togglePause = function() {
      this.game.togglePause();
      return console.log('togglePause');
    };

    return App;

  })(Backbone.View);

}).call(this);

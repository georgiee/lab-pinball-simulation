(function() {
  Pinball.Game = (function() {
    _(Game.prototype).extend(Backbone.Events);

    function Game(el) {
      this.el = el;
      this.init();
    }

    Game.prototype.init = function() {
      Pinball.Store.DEBUG_PHYSICS = false;
      this.game = new Phaser.Game(640, 970, Phaser.AUTO, this.el);
      this.game.state.add('boot', Pinball.Screens.Boot);
      this.game.state.add('prepreloader', Pinball.Screens.PrePreloader);
      this.game.state.add('preloader', Pinball.Screens.Preloader);
      this.game.state.add('game', Pinball.Screens.Game);
      return this.game.externalInterface = this;
    };

    Game.prototype.start = function() {
      return this.game.state.start('boot');
    };

    Game.prototype.togglePause = function() {
      return this.game.paused = !this.game.paused;
    };

    Game.prototype.toggleSound = function() {
      return this.game.sound.mute = !this.game.sound.mute;
    };

    return Game;

  })();

}).call(this);

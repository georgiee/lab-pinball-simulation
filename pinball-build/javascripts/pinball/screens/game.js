(function() {
  Pinball.Screens.Game = (function() {
    function Game(options) {
      if (options == null) {
        options = {};
      }
    }

    Game.prototype.create = function() {
      this.game.physics.startSystem(Phaser.Physics.P2JS);
      this.game.physics.p2.gravity.y = 350;
      this.game.stage.disableVisibilityChange = true;
      this.game.time.deltaCap = 1 / 30;
      this.game.physics.p2.useElapsedTime = true;
      this.machine = new Pinball.PinballMachine(this.game);
      this.game.world.add(this.machine);
      this.debug = new Pinball.Debug(this.game);
      return Pinball.Store.DEBUG = this.debug;
    };

    Game.prototype.render = function() {
      return this.debug.renderGeneralInfo();
    };

    return Game;

  })();

}).call(this);

(function() {
  Pinball.Screens.Boot = (function() {
    function Boot() {}

    Boot.prototype.preload = function() {
      return this.game.load.atlasJSONHash('preloader-sprites', 'gameassets/preloader.png', 'gameassets/preloader.json');
    };

    Boot.prototype.create = function() {
      if (!window.PINBALL_STANDALONE) {
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.minWidth = 503;
        this.game.scale.maxWidth = 503;
        this.game.scale.minHeight = 760;
        this.game.scale.maxHeight = 760;
      } else {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.pageAlignHorizontally = true;
      }
      this.game.scale.setScreenSize(true);
      return this.game.state.start('preloader');
    };

    return Boot;

  })();

}).call(this);

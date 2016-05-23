(function() {
  Pinball.Screens.Preloader = (function() {
    function Preloader() {}

    Preloader.prototype.preload = function() {
      Pinball.AssetLoader.load(this.game);
      return this.createWheel();
    };

    Preloader.prototype.createWheel = function() {
      this.wheel = this.game.add.sprite(0, 0, 'preloader-sprites');
      this.wheel.scale.x = 0.5;
      this.wheel.scale.y = 0.5;
      this.wheel.anchor.set(0.5);
      this.wheel.x = this.game.world.centerX;
      this.wheel.y = this.game.world.centerY;
      this.wheel.animations.add('spin', void 0, 30, true);
      return this.wheel.animations.play('spin');
    };

    Preloader.prototype.create = function() {
      return this.game.state.start('game');
    };

    return Preloader;

  })();

}).call(this);

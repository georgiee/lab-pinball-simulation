(function() {
  Pinball.AssetLoader = (function() {
    function AssetLoader() {}

    AssetLoader.load = function(game) {
      game.load.physics('physics', 'gameassets/physics.json', null, Phaser.Loader.PHYSICS_PHASER_JSON);
      game.load.bitmapFont('ledfont', 'gameassets/fonts/led.png', 'gameassets/fonts/led.fnt');
      game.load.image('table-wait', 'gameassets/images/wait.jpg');
      game.load.image('table', 'gameassets/themes/default-images/table.png');
      game.load.image('ramp', 'gameassets/themes/default-images/ramp.png');
      game.load.atlasJSONHash('sprites', 'gameassets/themes/default.png', 'gameassets/themes/default.json');
      game.load.image('flipper_bg', 'gameassets/images/flipper_bg.png');
      game.load.image('display_bg', 'gameassets/images/display_bg.png');
      game.load.audio('slingshot', 'gameassets/sounds/Bumper.wav');
      game.load.audio('flipper', 'gameassets/sounds/DE_Flipper_1.wav');
      game.load.audio('bumper', 'gameassets/sounds/HitBuffersV1.wav');
      game.load.audio('sinkhole', 'gameassets/sounds/TinkleBell01.wav');
      game.load.audio('ballout', 'gameassets/sounds/WeirdBellUp.wav');
      game.load.audio('plunger', 'gameassets/sounds/DE_Plunger_1.wav');
      return game.load.audio('rollover', 'gameassets/sounds/Swipe02.wav');
    };

    return AssetLoader;

  })();

}).call(this);

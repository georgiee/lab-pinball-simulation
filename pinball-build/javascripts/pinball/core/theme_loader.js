(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.ThemeLoader = (function() {
    function ThemeLoader(game, machine) {
      this.loadCompleted = __bind(this.loadCompleted, this);
      this.machine = machine;
      this.game = game;
      this.init();
      this.build();
    }

    ThemeLoader.prototype.init = function() {
      this.themes = {};
      this.loader = new Phaser.Loader(this.game);
      this.loader.onLoadComplete.add(this.loadCompleted);
      this.register(new Pinball.ThemeDefault());
      this.register(new Pinball.ThemeParty());
      return this.register(new Pinball.ThemeBeach());
    };

    ThemeLoader.prototype.build = function() {
      this.preloadScreen = new Pinball.ThemeLoadScreen(this.game);
      return this.game.world.addChild(this.preloadScreen);
    };

    ThemeLoader.prototype.load = function(id) {
      var theme;
      theme = _.first(_.where(this.themes, {
        id: id
      }));
      this.loader.image('table', theme.table);
      this.loader.image('ramp', theme.ramp);
      this.loader.atlasJSONHash('sprites', theme.sprite.texture, theme.sprite.atlas);
      return this.preloadScreen.captureFrame(this.machine.playfield).show().then((function(_this) {
        return function() {
          return _this.loader.start();
        };
      })(this));
    };

    ThemeLoader.prototype.register = function(theme) {
      return this.themes[theme.id] = theme;
    };

    ThemeLoader.prototype.loadCompleted = function() {
      this.refreshAssets();
      return this.preloadScreen.hide();
    };

    ThemeLoader.prototype.refreshAssets = function() {
      var ramp, spriteData, surface;
      spriteData = this.game.cache.getFrameData('sprites');
      _(spriteData._frames).each((function(_this) {
        return function(frame) {
          var sprite;
          sprite = _this.machine.playfield.entities.find({
            key: 'sprites',
            frameName: frame.name
          });
          return _(sprite).each(function(sprite) {
            if (sprite != null) {
              return sprite.loadTexture('sprites', frame.name);
            }
          });
        };
      })(this));
      surface = this.machine.playfield.get('surface');
      surface.loadTexture('table');
      ramp = this.machine.playfield.get('ramp');
      return ramp.loadTexture('ramp');
    };

    return ThemeLoader;

  })();

}).call(this);

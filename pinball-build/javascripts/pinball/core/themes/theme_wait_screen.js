(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.ThemeLoadScreen = (function(_super) {
    __extends(ThemeLoadScreen, _super);

    function ThemeLoadScreen(game) {
      this.fadeIn = __bind(this.fadeIn, this);
      this.fadeOut = __bind(this.fadeOut, this);
      ThemeLoadScreen.__super__.constructor.call(this, game);
      this.build();
    }

    ThemeLoadScreen.prototype.build = function() {
      this.snapshot = this.game.add.renderTexture(this.game.width, this.game.height, 'snapshot');
      this.snapshotImage = this.game.add.image(0, 0, this.snapshot);
      this.add(this.snapshotImage);
      this.waitImage = this.create(0, 0, 'table-wait');
      this.waitImage.alpha = 0.9;
      return this.visible = false;
    };

    ThemeLoadScreen.prototype.captureFrame = function(displayObject) {
      this.snapshot.render(displayObject);
      return this;
    };

    ThemeLoadScreen.prototype.show = function() {
      return this.fadeIn();
    };

    ThemeLoadScreen.prototype.hide = function() {
      return Q.delay(250).then(this.fadeOut);
    };

    ThemeLoadScreen.prototype.fadeOut = function() {
      var deferred, tweenOut;
      deferred = Q.defer();
      tweenOut = this.game.add.tween(this).to({
        alpha: 0
      }, 500).start();
      tweenOut.onComplete.addOnce((function(_this) {
        return function() {
          _this.visible = false;
          return deferred.resolve();
        };
      })(this));
      return deferred.promise;
    };

    ThemeLoadScreen.prototype.fadeIn = function() {
      var deferred, tweenIn;
      deferred = Q.defer();
      this.visible = true;
      this.alpha = 0;
      tweenIn = this.game.add.tween(this).to({
        alpha: 1
      }, 500).start();
      tweenIn.onComplete.addOnce(deferred.resolve);
      return deferred.promise;
    };

    return ThemeLoadScreen;

  })(Phaser.Group);

}).call(this);

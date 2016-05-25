(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Utils.ZoomZoomCamera = (function() {
    function ZoomZoomCamera(game, ball) {
      this.updateCamera = __bind(this.updateCamera, this);
      this.zoomInOut = __bind(this.zoomInOut, this);
      this.game = game;
      this.ball = ball;
      this._zoomFactor = 1;
      this.key_z = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
      this.key_z.onDown.add(this.zoomInOut, this);
      this.zoomTween = new TweenMax(this, .35, {
        zoomFactor: 1.8,
        ease: Sine.easeInOut,
        repeat: 3,
        yoyo: true,
        delay: 1
      });
      this.zoomTween.pause();
    }

    ZoomZoomCamera.prototype.zoomInOut = function() {
      console.log('@zoomTween', this.zoomTween);
      return this.zoomTween.restart();
    };

    ZoomZoomCamera.prototype.updateCamera = function() {
      var dx, dy, scale, tx, ty;
      scale = this._zoomFactor;
      this.game.camera.bounds.width = this.game.width * scale;
      this.game.camera.bounds.height = this.game.height * scale;
      tx = this.ball.worldTransform.tx;
      ty = this.ball.worldTransform.ty;
      dx = tx * (scale - 1);
      dy = ty * (scale - 1);
      this.game.camera.setPosition(dx, dy);
      this.game.camera.scale.set(scale);
      return this.s = this.s + 1;
    };

    Object.defineProperties(ZoomZoomCamera.prototype, {
      zoomFactor: {
        get: function() {
          return this._zoomFactor;
        },
        set: function(value) {
          this._zoomFactor = value;
          return this.updateCamera();
        }
      }
    });

    return ZoomZoomCamera;

  })();

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Base.ComponentLightable = (function() {
    function ComponentLightable(game, sprite, options) {
      this.toggleLight = __bind(this.toggleLight, this);
      this.handleBlinkComplete = __bind(this.handleBlinkComplete, this);
      this.blinkCompleted = new Phaser.Signal();
      this.game = game;
      this.sprite = sprite;
      this._frame = options.frame;
      this._frameLightened = options.frameLightened;
      this._alphaLightened = options.alphaLightened || 1;
      this._alpha = options.alpha || 0.5;
      this.timer = this.game.time.create(false);
      this.timer.onComplete.add(this.handleBlinkComplete);
      this.powered = false;
      this.lightOff();
    }

    ComponentLightable.prototype.handleBlinkComplete = function() {
      return this.blinkCompleted.dispatch();
    };

    ComponentLightable.prototype.lightOn = function() {
      this.powered = true;
      if (this._frameLightened) {
        this.sprite.frameName = this._frameLightened;
      }
      return this.sprite.alpha = this._alphaLightened;
    };

    ComponentLightable.prototype.lightOff = function() {
      this.powered = false;
      if (this._frameLightened) {
        this.sprite.frameName = this._frame;
      }
      return this.sprite.alpha = this._alpha;
    };

    ComponentLightable.prototype.stopBlink = function() {
      return this.timer.stop(true);
    };

    ComponentLightable.prototype.blink = function(delay, offset, count) {
      if (delay == null) {
        delay = 500;
      }
      if (offset == null) {
        offset = 0;
      }
      if (count == null) {
        count = 3;
      }
      count = count * 2;
      this.timer.stop(true);
      if (count > 0) {
        this.timer.repeat(delay, count, this.toggleLight);
      } else {
        this.timer.loop(delay, this.toggleLight);
      }
      return this.timer.start(offset);
    };

    ComponentLightable.prototype.toggleLight = function() {
      if (this.powered) {
        return this.lightOff();
      } else {
        return this.lightOn();
      }
    };

    return ComponentLightable;

  })();

}).call(this);

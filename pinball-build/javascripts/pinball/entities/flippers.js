(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Machine.Flippers = (function(_super) {
    __extends(Flippers, _super);

    function Flippers(game, ground, material) {
      Flippers.__super__.constructor.call(this, game);
      this.material = material;
      this.ground = ground;
      this.init();
    }

    Flippers.prototype.init = function() {
      this.buildFlipperLeft();
      this.buildFlipperRight();
      return this.buildFlipperRamp();
    };

    Flippers.prototype.buildFlipperLeft = function() {
      this.flipperLeft = new Pinball.Entities.FlipperLeft(this.game, this.material);
      this.add(this.flipperLeft);
      return this.flipperLeft.revoluteAround(this.ground, [640 / 2 + -96, 970 / 2 + 396]);
    };

    Flippers.prototype.buildFlipperRight = function() {
      this.flipperRight = new Pinball.Entities.FlipperRight(this.game, this.material);
      this.add(this.flipperRight);
      return this.flipperRight.revoluteAround(this.ground, [640 / 2 + 74, 970 / 2 + 396]);
    };

    Flippers.prototype.buildFlipperRamp = function() {
      this.flipperRamp = new Pinball.Entities.RampFlipper(this.game);
      this.add(this.flipperRamp);
      this.flipperRamp.setAmplitudes(0, 70);
      return this.flipperRamp.revoluteAround(this.ground, [640 / 2 + 65, 970 / 2 + -90]);
    };

    Flippers.prototype.left = function(active) {
      if (active) {
        this.flipperLeft.enable();
        return this.flipperRamp.enable();
      } else {
        this.flipperLeft.disable();
        return this.flipperRamp.disable();
      }
    };

    Flippers.prototype.right = function(active) {
      if (active) {
        return this.flipperRight.enable();
      } else {
        return this.flipperRight.disable();
      }
    };

    Flippers.prototype.update = function() {
      if (this.game.input.activePointer && this.game.input.activePointer.isDown) {
        this.flipperLeftActive = Math.floor(this.game.input.activePointer.x / (this.game.width / 2)) === 0;
        this.flipperRightActive = Math.floor(this.game.input.activePointer.x / (this.game.width / 2)) === 1;
      }
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.flipperLeftActive = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
        this.flipperRightActive = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
      }
      this.left(this.flipperLeftActive);
      this.right(this.flipperRightActive);
      this.flipperLeftActive = false;
      return this.flipperRightActive = false;
    };

    return Flippers;

  })(Phaser.Group);

}).call(this);

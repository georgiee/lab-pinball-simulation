(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Controls = (function(_super) {
    __extends(Controls, _super);

    function Controls(game, ground, flipperMaterial) {
      this.handlePointerDown = __bind(this.handlePointerDown, this);
      this.handlePointerUp = __bind(this.handlePointerUp, this);
      Controls.__super__.constructor.call(this, game);
      this.flipperMaterial = flipperMaterial;
      this.ground = ground;
      this.build();
    }

    Controls.prototype.build = function() {
      this.flipperRectLeft = new Phaser.Rectangle(0, 0, this.game.width / 2, this.game.height);
      this.flipperRectRight = new Phaser.Rectangle(this.game.width / 2, 0, this.game.width / 2, this.game.height);
      this.plungerRect = new Phaser.Rectangle(this.game.width - 80, this.game.height - 200, 80, 200);
      this.buildFlippers();
      this.buildMainPlunger();
      this.game.input.onDown.add(this.handlePointerDown);
      return this.game.input.onUp.add(this.handlePointerUp);
    };

    Controls.prototype.buildFlippers = function() {
      this.flippers = new Pinball.Machine.Flippers(this.game, this.ground, this.flipperMaterial);
      return this.add(this.flippers);
    };

    Controls.prototype.buildMainPlunger = function() {
      var plungerMask;
      this.plunger = new Pinball.Entities.Plunger(this.game, this.ground);
      this.add(this.plunger);
      plungerMask = this.game.add.graphics(0, 0);
      plungerMask.beginFill(0xff0000);
      plungerMask.drawRect(-50, -200, 100, 200);
      plungerMask.x = this.plunger.x;
      plungerMask.y = this.plunger.y;
      this.plunger.mask = plungerMask;
      this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      this.spacebar.onDown.add(this.plunger.tense);
      return this.spacebar.onUp.add(this.plunger.release);
    };

    Controls.prototype.handlePointerUp = function(activePointer) {
      return this.testPointers(activePointer);
    };

    Controls.prototype.handlePointerDown = function(activePointer) {
      return this.testPointers(activePointer);
    };

    Controls.prototype.testPointers = function() {
      var leftActive, plungerTensed, pointer, rightActive;
      leftActive = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
      rightActive = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
      plungerTensed = this.spacebar.isDown;
      if (this.game.input.mousePointer.isDown) {
        pointer = this.game.input.mousePointer;
        leftActive = this.flipperRectLeft.contains(pointer.x, pointer.y) || leftActive;
        rightActive = this.flipperRectRight.contains(pointer.x, pointer.y) || rightActive;
        plungerTensed = this.plungerRect.contains(pointer.x, pointer.y) || plungerTensed;
      }
      if (this.game.input.pointer1.active) {
        pointer = this.game.input.pointer1;
        leftActive = this.flipperRectLeft.contains(pointer.x, pointer.y) || leftActive;
        rightActive = this.flipperRectRight.contains(pointer.x, pointer.y) || rightActive;
        plungerTensed = this.plungerRect.contains(pointer.x, pointer.y) || plungerTensed;
      }
      if (this.game.input.pointer2.active) {
        pointer = this.game.input.pointer2;
        leftActive = this.flipperRectLeft.contains(pointer.x, pointer.y) || leftActive;
        rightActive = this.flipperRectRight.contains(pointer.x, pointer.y) || rightActive;
        plungerTensed = this.plungerRect.contains(pointer.x, pointer.y) || plungerTensed;
      }
      this.flippers.left(leftActive);
      this.flippers.right(rightActive && !plungerTensed);
      if (plungerTensed) {
        return this.plunger.tense();
      } else {
        return this.plunger.release();
      }
    };

    Controls.prototype.update = function() {
      return this.testPointers();
    };

    return Controls;

  })(Phaser.Group);

}).call(this);

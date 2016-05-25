(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Machine.Display = (function(_super) {
    __extends(Display, _super);

    function Display(game) {
      this.toggleAlpha = __bind(this.toggleAlpha, this);
      Display.__super__.constructor.call(this, game);
      this.x = 306;
      this.y = 723;
      this.build();
    }

    Display.prototype.build = function() {
      var bg;
      this.timer = this.game.time.create(false);
      bg = this.game.add.sprite(0, 0, 'display_bg');
      bg.anchor.set(0.5);
      this.add(bg);
      this.textfield = this.game.add.group();
      this.add(this.textfield);
      this.mainTextField = new Phaser.BitmapText(this.game, 0, 0, 'ledfont', void 0, 14);
      this.mainTextField.align = 'center';
      this.textfield.add(this.mainTextField);
      this.subTextField = new Phaser.BitmapText(this.game, 0, 0, 'ledfont', void 0, 14);
      this.subTextField.align = 'center';
      this.textfield.add(this.subTextField);
      this.subTextField2 = new Phaser.BitmapText(this.game, 0, 0, 'ledfont', void 0, 9);
      this.subTextField2.align = 'center';
      this.textfield.add(this.subTextField2);
      return this.setText('HELLO!');
    };

    Display.prototype.setText = function(value) {
      var anchor;
      this.mainTextField.text = ("" + value).toUpperCase();
      this.mainTextField.updateText();
      anchor = [0.5, 0];
      this.mainTextField.x = this.mainTextField.textWidth * (anchor[0] - 1);
      return this.mainTextField.y = this.mainTextField.textHeight * (anchor[1] - 1) - 20;
    };

    Display.prototype.setText2 = function(value) {
      var anchor;
      this.subTextField.text = ("" + value).toUpperCase();
      this.subTextField.updateText();
      anchor = [0.5, 0];
      this.subTextField.x = this.subTextField.textWidth * (anchor[0] - 1);
      return this.subTextField.y = this.subTextField.textHeight * (anchor[1] - 1) + 75;
    };

    Display.prototype.setText3 = function(value) {
      var anchor;
      this.subTextField2.text = ("" + value).toUpperCase();
      this.subTextField2.updateText();
      anchor = [0.5, 0];
      this.subTextField2.x = this.subTextField2.textWidth * (anchor[0] - 1);
      return this.subTextField2.y = this.subTextField2.textHeight * (anchor[1] - 1) + 35;
    };

    Display.prototype.clear = function() {
      this.setText('');
      this.setText2('');
      return this.setText3('');
    };

    Display.prototype.getID = function() {
      return 'display';
    };

    Display.prototype.blink = function(delay, offset, count) {
      if (delay == null) {
        delay = 100;
      }
      if (offset == null) {
        offset = 0;
      }
      if (count == null) {
        count = 10;
      }
      count = count * 2;
      this.timer.stop(true);
      if (count > 0) {
        this.timer.repeat(delay, count, this.toggleAlpha);
      } else {
        this.timer.loop(delay, this.toggleAlpha);
      }
      return this.timer.start(offset);
    };

    Display.prototype.toggleAlpha = function() {
      if (this.mainTextField.alpha === 0) {
        return this.mainTextField.alpha = 1;
      } else {
        return this.mainTextField.alpha = 0;
      }
    };

    return Display;

  })(Pinball.Base.PinballGroup);

}).call(this);

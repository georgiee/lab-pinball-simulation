(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.Door = (function(_super) {
    __extends(Door, _super);

    Door.prototype.pivotCenter = {
      x: 0,
      y: 10
    };

    function Door(game, x, y, spriteKey) {
      this.close = __bind(this.close, this);
      this.open = __bind(this.open, this);
      Door.__super__.constructor.call(this, game, x, y, 'sprites', spriteKey);
      this.build();
    }

    Door.prototype.build = function() {
      this.inputEnabled = true;
      this.events.onInputDown.add(this.open);
      return this.events.onInputUp.add(this.close);
    };

    Door.prototype.open = function() {};

    Door.prototype.close = function() {};

    return Door;

  })(Phaser.Sprite);

}).call(this);

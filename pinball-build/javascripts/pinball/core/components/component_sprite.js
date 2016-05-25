(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.ComponentSprite = (function(_super) {
    __extends(ComponentSprite, _super);

    function ComponentSprite(game) {
      ComponentSprite.__super__.constructor.call(this, game);
    }

    return ComponentSprite;

  })(Phaser.Sprite);

}).call(this);

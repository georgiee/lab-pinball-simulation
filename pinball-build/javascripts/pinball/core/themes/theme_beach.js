(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.ThemeBeach = (function(_super) {
    __extends(ThemeBeach, _super);

    function ThemeBeach() {
      ThemeBeach.__super__.constructor.call(this, {
        id: 'beach',
        sprite: {
          texture: 'gameassets/themes/beach.png',
          atlas: 'gameassets/themes/beach.json'
        },
        table: 'gameassets/themes/beach-images/table.png',
        ramp: 'gameassets/themes/beach-images/ramp.png'
      });
    }

    return ThemeBeach;

  })(Pinball.Theme);

}).call(this);

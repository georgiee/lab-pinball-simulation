(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.ThemeDefault = (function(_super) {
    __extends(ThemeDefault, _super);

    function ThemeDefault() {
      ThemeDefault.__super__.constructor.call(this, {
        id: 'default',
        sprite: {
          texture: 'gameassets/themes/default.png',
          atlas: 'gameassets/themes/default.json'
        },
        table: 'gameassets/themes/default-images/table.png',
        ramp: 'gameassets/themes/default-images/ramp.png'
      });
    }

    return ThemeDefault;

  })(Pinball.Theme);

}).call(this);

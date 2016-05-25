(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.ThemeParty = (function(_super) {
    __extends(ThemeParty, _super);

    function ThemeParty() {
      ThemeParty.__super__.constructor.call(this, {
        id: 'party',
        sprite: {
          texture: 'gameassets/themes/party.png',
          atlas: 'gameassets/themes/party.json'
        },
        table: 'gameassets/themes/party-images/table.png',
        ramp: 'gameassets/themes/party-images/ramp.png'
      });
    }

    return ThemeParty;

  })(Pinball.Theme);

}).call(this);

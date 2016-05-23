(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.MissionLight = (function(_super) {
    __extends(MissionLight, _super);

    function MissionLight(game, options) {
      MissionLight.__super__.constructor.call(this, game, options);
    }

    return MissionLight;

  })(Pinball.Base.Light);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Machine.TableLights = (function(_super) {
    __extends(TableLights, _super);

    function TableLights(game, factory) {
      TableLights.__super__.constructor.call(this, game);
      this.factory = factory;
      this.init();
      this.create();
      this.createLightGroups();
    }

    TableLights.prototype.init = function() {
      return this.lightgroups = [];
    };

    TableLights.prototype.create = function() {
      var item, object, _i, _len, _ref, _results;
      _ref = Pinball.DATA.lights;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        object = _ref[_i];
        item = this.factory.create(object);
        _results.push(this.add(item));
      }
      return _results;
    };

    TableLights.prototype.createLightGroups = function() {
      var lightgroup, lightgroupData, _i, _len, _ref, _results;
      _ref = Pinball.DATA.lightgroups;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        lightgroupData = _ref[_i];
        lightgroup = this.factory.createLightGroup(lightgroupData);
        this.add(lightgroup);
        _results.push(this.lightgroups.push(lightgroup));
      }
      return _results;
    };

    TableLights.prototype.getLight = function(id) {
      return this.factory.getObject(id);
    };

    TableLights.prototype.getLights = function(ids) {
      return _(ids).map((function(_this) {
        return function(id) {
          return _this.getLight(id);
        };
      })(this));
    };

    return TableLights;

  })(Phaser.Group);

}).call(this);

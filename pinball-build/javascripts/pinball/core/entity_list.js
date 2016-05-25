(function() {
  Pinball.Core.EntityList = (function() {
    function EntityList() {
      this.list = {};
      this.listByType = {};
    }

    EntityList.prototype.get = function(id) {
      return this.list[id];
    };

    EntityList.prototype.find = function(options) {
      return _(this.list).where(options);
    };

    EntityList.prototype.each = function(fn) {
      return _(this.list).each(fn);
    };

    EntityList.prototype.getAll = function() {
      var entity, key, list, _ref;
      list = [];
      _ref = this.list;
      for (key in _ref) {
        entity = _ref[key];
        list.push(entity);
      }
      return list;
    };

    EntityList.prototype.register = function(entity) {
      var id, type;
      id = entity.getID();
      type = entity.getType();
      this.list[id] = entity;
      this.listByType[type] = this.listByType[type] || [];
      return this.listByType[type].push(entity);
    };

    EntityList.prototype.getAllFromType = function(type) {
      return this.listByType[type];
    };

    return EntityList;

  })();

}).call(this);

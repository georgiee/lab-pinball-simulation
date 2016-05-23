(function() {
  Pinball.ActionList = (function() {
    function ActionList(actions) {
      var action, ungrouped, _i, _len;
      this.list = [];
      ungrouped = _.flatten(_.values(actions.grouped));
      actions = ungrouped.concat(actions.unsorted);
      for (_i = 0, _len = actions.length; _i < _len; _i++) {
        action = actions[_i];
        action = this.expandGrouping(action);
        action = this.expandTargets(action);
        action = this.expandStates(action);
        this.list.push(action);
      }
      this.list = _(this.list).flatten();
    }

    ActionList.prototype.each = function(callback) {
      return _(this.list).each(callback);
    };

    ActionList.prototype.expandGrouping = function(action) {
      if (_(action).keys().length === 1) {
        console.log(action);
      }
      return action;
    };

    ActionList.prototype.expandTargets = function(action) {
      var actions;
      if (action.target instanceof Array) {
        actions = _(action.target).map(function(target) {
          return _.extend({
            target: target
          }, _(action).omit('target'));
        });
      }
      return actions || action;
    };

    ActionList.prototype.expandStates = function(action) {
      var actions;
      if (action instanceof Array) {
        return _(action).map((function(_this) {
          return function(action) {
            return _this.expandStates(action);
          };
        })(this));
      }
      if (action.state instanceof Array) {
        actions = _(action.state).map(function(state) {
          return _.extend({
            state: state
          }, _(action).omit('state'));
        });
      }
      return actions || action;
    };

    return ActionList;

  })();

}).call(this);

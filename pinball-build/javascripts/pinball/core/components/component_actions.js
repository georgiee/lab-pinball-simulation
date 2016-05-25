(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Base.ComponentActions = (function() {
    function ComponentActions() {
      this.run = __bind(this.run, this);
      this.actions = [];
    }

    ComponentActions.prototype.addAction = function(action) {
      return this.actions.push(action);
    };

    ComponentActions.prototype.run = function(forState) {
      var action, actions, _i, _len, _results;
      actions = _(this.actions).where({
        state: forState
      });
      _results = [];
      for (_i = 0, _len = actions.length; _i < _len; _i++) {
        action = actions[_i];
        _results.push(action.run());
      }
      return _results;
    };

    return ComponentActions;

  })();

}).call(this);

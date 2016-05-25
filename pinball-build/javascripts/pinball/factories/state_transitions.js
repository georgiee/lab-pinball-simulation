(function() {
  Pinball.Logic.StateTransitions = (function() {
    function StateTransitions(game, playfield, gameModel, gameplay) {
      this.game = game;
      this.playfield = playfield;
      this.gameplay = gameplay;
      this.gameModel = gameModel;
      this.states = [];
    }

    StateTransitions.prototype.createState = function(options) {
      var action;
      action = new Pinball.Logic.State(options);
      this.states.push(action);
      return action;
    };

    StateTransitions.prototype.trigger = function(event) {
      var state, states, _i, _len, _results;
      states = _(this.states).where({
        event: event
      });
      _results = [];
      for (_i = 0, _len = states.length; _i < _len; _i++) {
        state = states[_i];
        _results.push(state.transition(this.playfield));
      }
      return _results;
    };

    StateTransitions.prototype.parse = function(list) {
      var stateData, _i, _len, _results;
      list = _(list).map((function(_this) {
        return function(stateData) {
          return _this.expandProperty('event', stateData);
        };
      })(this));
      list = _.flatten(list);
      _results = [];
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        stateData = list[_i];
        _results.push(this.createState(stateData));
      }
      return _results;
    };

    StateTransitions.prototype.expandProperty = function(property, item) {
      var items;
      if (item[property] instanceof Array) {
        items = _(item[property]).map(function(propertyValue) {
          var o;
          o = {};
          o[property] = propertyValue;
          return _.extend(o, _(item).omit(property));
        });
      }
      return items || item;
    };

    return StateTransitions;

  })();

}).call(this);

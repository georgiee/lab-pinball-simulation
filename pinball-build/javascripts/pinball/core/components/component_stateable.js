(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Core.StateableEntity = (function() {
    function StateableEntity(states) {
      this.runActions = __bind(this.runActions, this);
      this.handleTransition = __bind(this.handleTransition, this);
      this.actions = [];
      this.states = states;
      this.initFSM();
    }

    StateableEntity.prototype.trigger = function(event, force) {
      if (force) {
        switch (event) {
          case 'endball':
            return this.fsm.transition('ballout');
          case 'newball':
            return this.fsm.transition('idle');
        }
      } else {
        return this.fsm.handle(event);
      }
    };

    StateableEntity.prototype.registerAction = function(action) {
      return this.actions.push(action);
    };

    StateableEntity.prototype.initFSM = function() {
      this.fsm = new machina.Fsm({
        initialState: "ballout",
        states: this.getStates()
      });
      this.fsm.on('run.actions', this.runActions);
      return this.fsm.on('transition', this.handleTransition);
    };

    StateableEntity.prototype.handleTransition = function(options) {
      var newState;
      newState = options.toState;
      console.log('handleTransition', newState);
      return this.runActions(newState);
    };

    StateableEntity.prototype.runActions = function(forState) {
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

    StateableEntity.prototype.getStates = function() {
      return {
        "ballout": {
          "newball": "idle"
        },
        "idle": {
          "hit": "hitted"
        },
        "hitted": {},
        "lightened": {}
      };
    };

    return StateableEntity;

  })();

}).call(this);

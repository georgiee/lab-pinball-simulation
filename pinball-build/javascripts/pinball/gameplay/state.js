(function() {
  Pinball.Logic.State = (function() {
    function State(options) {
      this.target = options.target;
      this.targetEntityType = options.targetEntityType;
      this.event = options.event;
      this.transitionEvent = options.transitionEvent;
    }

    State.prototype.transition = function(playfield) {
      var entities, entity, _i, _len, _results;
      entities = [];
      if (this.targetEntityType) {
        entities = playfield.getAllFromType(this.targetEntityType);
      } else if (this.target instanceof Array) {
        entities = playfield.getMultiple(this.target);
      } else if (this.target) {
        entities = [playfield.get(this.target)];
      }
      _results = [];
      for (_i = 0, _len = entities.length; _i < _len; _i++) {
        entity = entities[_i];
        _results.push(entity.transition(this.transitionEvent));
      }
      return _results;
    };

    return State;

  })();

}).call(this);

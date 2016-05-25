(function() {
  Pinball.Base.ComponentEvents = (function() {
    function ComponentEvents(entity) {
      this.entity = entity;
      this.events = [];
    }

    ComponentEvents.prototype.register = function(event, callback) {
      return this.events[event] = callback;
    };

    ComponentEvents.prototype.trigger = function(event) {
      if (this.events[event]) {
        return this.events[event].apply(this.entity);
      }
    };

    return ComponentEvents;

  })();

}).call(this);

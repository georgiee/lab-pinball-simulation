(function() {
  Pinball.Base.PinballEntityWrapper = (function() {
    function PinballEntityWrapper(object, options) {
      this.object = object;
      this._id = options.name;
    }

    PinballEntityWrapper.prototype.getObject = function() {
      return this.object;
    };

    PinballEntityWrapper.prototype.getType = function() {
      return 'compatibility_wrapper';
    };

    PinballEntityWrapper.prototype.getID = function() {
      return this._id;
    };

    return PinballEntityWrapper;

  })();

}).call(this);

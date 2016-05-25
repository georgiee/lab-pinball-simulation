(function() {
  Pinball.Theme = (function() {
    function Theme(options) {
      this.id = options.id;
      this.sprite = options.sprite;
      this.table = options.table;
      this.ramp = options.ramp;
    }

    return Theme;

  })();

}).call(this);

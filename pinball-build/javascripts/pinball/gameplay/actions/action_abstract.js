(function() {
  Pinball.Logic.ActionAbstract = (function() {
    function ActionAbstract(game, options) {
      this.game = game;
      this.target = options.target;
      this.state = options.state;
      this.action = options.action;
      this.payload = options.payload;
    }

    ActionAbstract.prototype.run = function() {
      return 'run action';
    };

    return ActionAbstract;

  })();

}).call(this);

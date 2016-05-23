(function() {
  Pinball.Controller.DisplayController = (function() {
    function DisplayController(game, display, options) {
      this.game = game;
      this.display = display;
      this.gameModel = options.model;
    }

    return DisplayController;

  })();

}).call(this);

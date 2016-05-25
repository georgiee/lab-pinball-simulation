(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.PinballMachine = (function(_super) {
    __extends(PinballMachine, _super);

    function PinballMachine(game) {
      this.handleScoreChanged = __bind(this.handleScoreChanged, this);
      this.ballOut = __bind(this.ballOut, this);
      this.handleMouseClick = __bind(this.handleMouseClick, this);
      this.handleChangeTheme = __bind(this.handleChangeTheme, this);
      PinballMachine.__super__.constructor.call(this, game);
      this.init();
    }

    PinballMachine.prototype.handleChangeTheme = function(theme) {
      return this.themeManager.load(theme);
    };

    PinballMachine.prototype.init = function() {
      this.themeManager = new Pinball.ThemeLoader(this.game, this);
      this.game.externalInterface.on('change.theme', this.handleChangeTheme);
      this.gameModel = new Pinball.Models.Game();
      this.gameModel.on('change:score', this.handleScoreChanged);
      this.gameModel.on('newball', this.handleNewBall);
      this.gameModel.on('endball', this.handleEndBall);
      this.playfield = new Pinball.Playfield(this.game);
      this.playfield.createPlayfield(Pinball.DATA);
      this.add(this.playfield);
      this.gameplay = new Pinball.Gameplay(this.game, this);
      this.gameplay.create();
      this.initControllers();
      this.game.input.onTap.add(this.handleMouseClick);
      return this.game.time.events.add(250, (function(_this) {
        return function() {
          return _this.gameplay.startGame();
        };
      })(this));
    };

    PinballMachine.prototype.initControllers = function() {
      this.zoomZoom = new Pinball.Utils.ZoomZoomCamera(this.game, this.playfield.get('ball'));
      this.ballCollisions = new Pinball.Core.EntityContactListener(this.game, this.playfield.get('ball').collidable);
      this.rampController = new Pinball.Controller.RampController(this.game, this.ballCollisions, this.playfield);
      this.tableZonesController = new Pinball.Controller.TableZonesController(this.game, this.ballCollisions, this.playfield);
      this.entityHitController = new Pinball.Controller.EntityHitController(this.ballCollisions, this.gameplay);
      this.entityHitController.register(this.playfield.getAll());
      return this.displayController = new Pinball.Controller.DisplayController(this.game, this.playfield.get('display'), {
        model: this.gameModel
      });
    };

    PinballMachine.prototype.handleMouseClick = function(e, double) {
      if (double) {
        if (this.game.input.x < 50 && this.game.input.y > 500) {
          return Pinball.Store.DEBUG.shootBallIntoRamp(this.playfield.get('ball'));
        } else {
          return Pinball.Store.DEBUG.placeBallAtMouse(this.playfield.get('ball'));
        }
      }
    };

    PinballMachine.prototype.ballOut = function() {};

    PinballMachine.prototype.handleScoreChanged = function() {
      return this.game.externalInterface.trigger('score.changed', this.gameModel.get('score'));
    };

    return PinballMachine;

  })(Phaser.Group);

}).call(this);

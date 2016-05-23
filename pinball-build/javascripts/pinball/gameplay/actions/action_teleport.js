(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.TeleportAction = (function(_super) {
    __extends(TeleportAction, _super);

    function TeleportAction(game, gameModel, playfield, machine, options) {
      this.teleport = __bind(this.teleport, this);
      TeleportAction.__super__.constructor.call(this, game, options);
      this.machine = machine;
      this.playfield = playfield;
      this.gameModel = gameModel;
      this.score = options.score;
      this.destination = options.destination;
      this.holdtime = options.holdtime;
      this.shoot = options.shoot;
      this.disableRamp = options.disableRamp;
    }

    TeleportAction.prototype.run = function() {
      var ball, destination;
      ball = this.playfield.get('ball');
      ball.remove();
      destination = this.playfield.get(this.destination);
      return this.game.time.events.add(this.holdtime || 2000, this.teleport);
    };

    TeleportAction.prototype.teleport = function() {
      var ball, destination;
      destination = this.playfield.get(this.destination);
      destination.receive();
      ball = this.playfield.get('ball');
      ball.add(destination.x, destination.y);
      ball.shoot(this.shoot[0], this.shoot[1]);
      this.gameModel.addScore(this.score);
      if (this.disableRamp) {
        return this.machine.rampController.disableRampAfterHole();
      }
    };

    TeleportAction.prototype.getType = function() {
      return 'score';
    };

    return TeleportAction;

  })(Pinball.Logic.ActionAbstract);

}).call(this);

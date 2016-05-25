(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.DoorAutoPlunger = (function(_super) {
    __extends(DoorAutoPlunger, _super);

    DoorAutoPlunger.prototype.bodyCenter = {
      x: 20,
      y: 10
    };

    DoorAutoPlunger.prototype.slideWidth = 45;

    function DoorAutoPlunger(game, x, y) {
      this.close = __bind(this.close, this);
      this.open = __bind(this.open, this);
      DoorAutoPlunger.__super__.constructor.call(this, game, x, y, 'entities/door_auto_plunger.png');
      this.build();
    }

    DoorAutoPlunger.prototype.build = function() {
      this.game.physics.p2.enable(this);
      this.body.clearShapes();
      this.body.allowSleep = true;
      this.body.addPhaserPolygon('physics', 'door_auto_plunger');
      this.inputEnabled = true;
      this.events.onInputDown.add(this.open);
      return this.events.onInputUp.add(this.close);
    };

    DoorAutoPlunger.prototype.open = function() {
      this.constraint.upperLimit = this.game.physics.p2.pxm(this.slideWidth);
      this.constraint.enableMotor();
      return this.constraint.motorSpeed = 15;
    };

    DoorAutoPlunger.prototype.close = function() {
      this.constraint.disableMotor();
      return this.constraint.upperLimit = this.game.physics.p2.pxm(0);
    };

    DoorAutoPlunger.prototype.slideAlong = function(ground, offsets) {
      var slope;
      this.body.x = offsets[0] - this.bodyCenter.x;
      this.body.y = offsets[1] - this.bodyCenter.y;
      this.body.fixedRotation = true;
      this.body.mass = 2;
      slope = [1, .735];
      this.constraint = this.game.physics.p2.createPrismaticConstraint(this, ground, true, [this.bodyCenter.x, this.bodyCenter.y], offsets, slope);
      this.constraint.upperLimitEnabled = true;
      this.constraint.lowerLimitEnabled = true;
      this.constraint.upperLimit = this.game.physics.p2.pxm(0);
      return this.constraint.lowerLimit = this.game.physics.p2.pxm(0);
    };

    return DoorAutoPlunger;

  })(Pinball.Entities.Door);

}).call(this);

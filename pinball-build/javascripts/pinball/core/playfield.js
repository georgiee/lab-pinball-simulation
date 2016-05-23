(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Playfield = (function(_super) {
    __extends(Playfield, _super);

    function Playfield(game) {
      Playfield.__super__.constructor.call(this, game);
      this.build();
    }

    Playfield.prototype.build = function() {
      this.entities = new Pinball.Core.EntityList();
      return this.factory = new Pinball.Factories.ComponentFactory(this.game);
    };

    Playfield.prototype.register = function(entity) {
      entity.playfield = this;
      return this.entities.register(entity);
    };

    Playfield.prototype.createPlayfield = function(data) {
      this.buildBase();
      this.buildEntities(data);
      this.buildMissionProgress();
      this.bringToTop(this.ball);
      this.bringToTop(this.rampGroup);
      return this.bringToTop(this.controls);
    };

    Playfield.prototype.buildBase = function() {
      this.buildSurface();
      this.buildBall();
      this.buildAutoPlunger();
      this.buildDisplay();
      this.buildRamp();
      return this.buildControls();
    };

    Playfield.prototype.getGround = function() {
      return this.ground;
    };

    Playfield.prototype.get = function(id) {
      return this.entities.get(id);
    };

    Playfield.prototype.getMultiple = function(ids) {
      return _(ids).map((function(_this) {
        return function(id) {
          return _this.get(id);
        };
      })(this));
    };

    Playfield.prototype.getAll = function() {
      return this.entities.getAll();
    };

    Playfield.prototype.getAllFromType = function(type) {
      return this.entities.getAllFromType(type);
    };

    Playfield.prototype.moveBallOverRamp = function() {
      if (this.getIndex(this.ball) < this.getIndex(this.rampGroup)) {
        return this.swap(this.ball, this.rampGroup);
      }
    };

    Playfield.prototype.moveBallBehindRamp = function() {
      if (this.getIndex(this.ball) > this.getIndex(this.rampGroup)) {
        return this.swap(this.ball, this.rampGroup);
      }
    };

    Playfield.prototype.update = function() {
      return this.controls.update();
    };

    Playfield.prototype.buildSurface = function() {
      this.ground = new p2.Body();
      this.game.physics.p2.world.addBody(this.ground);
      this.surface = new Pinball.Entities.Surface(this.game, this.game.world.centerX, this.game.world.centerY);
      this.register(this.surface);
      return this.add(this.surface);
    };

    Playfield.prototype.buildDisplay = function() {
      this.display = new Pinball.Machine.Display(this.game);
      this.register(this.display);
      return this.add(this.display);
    };

    Playfield.prototype.buildMissionProgress = function() {
      var data;
      data = _.chain(Pinball.DATA.lightgroups).where({
        name: 'missionProgressLights'
      }).first().value();
      this.missionProgress = new Pinball.Entities.MissionProgress(this.game, data);
      this.missionProgress.addLights(this.getMultiple(data.lights));
      this.register(this.missionProgress);
      return this.add(this.missionProgress);
    };

    Playfield.prototype.buildRamp = function() {
      this.rampGroup = this.game.add.group(this);
      this.ramp = new Pinball.Entities.Ramp(this.game, 496, 473, this.ball);
      this.rampGroup.add(this.ramp);
      return this.register(this.ramp);
    };

    Playfield.prototype.buildBall = function() {
      this.ball = this.factory.createBall();
      this.register(this.ball);
      return this.add(this.ball);
    };

    Playfield.prototype.buildAutoPlunger = function() {
      this.autoPlunger = new Pinball.Entities.AutoPlunger(this.game, this.ground);
      this.register(this.autoPlunger);
      return this.add(this.autoPlunger);
    };

    Playfield.prototype.buildControls = function() {
      this.controls = new Pinball.Controls(this.game, this.ground, this.factory.materials.flipperMaterial);
      this.register(this.controls.flippers.flipperLeft);
      this.register(this.controls.flippers.flipperRight);
      this.register(this.controls.flippers.flipperRamp);
      this.register(this.controls.plunger);
      return this.add(this.controls);
    };

    Playfield.prototype.buildEntities = function(data) {
      var entities, entity, entityData, _i, _len, _results;
      entities = _.flatten([data.objects, data.lights, data.lightgroups]);
      _results = [];
      for (_i = 0, _len = entities.length; _i < _len; _i++) {
        entityData = entities[_i];
        if (entityData.useCustomClass) {
          continue;
        }
        entity = this.factory.create(entityData);
        this.register(entity);
        if (entity.options.onramp) {
          _results.push(this.rampGroup.add(entity));
        } else if (entity instanceof Phaser.Sprite) {
          _results.push(this.add(entity));
        } else if (entity instanceof Phaser.Group) {
          _results.push(this.add(entity));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Playfield;

  })(Phaser.Group);

}).call(this);

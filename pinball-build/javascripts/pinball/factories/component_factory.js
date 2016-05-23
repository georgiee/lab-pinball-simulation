(function() {
  Pinball.Factories.ComponentFactory = (function() {
    function ComponentFactory(game, materials) {
      this.game = game;
      this.init();
    }

    ComponentFactory.prototype.init = function() {
      this.objects = {};
      return this.materials = new Pinball.Core.Materials(this.game);
    };

    ComponentFactory.prototype.create = function(object) {
      switch (object.type) {
        case 'light':
          return this.createLight(object);
        case 'bumper':
          return this.createBumper(object);
        case 'rollover':
          return this.createRollover(object);
        case 'target':
          return this.createTarget(object);
        case 'hole':
          return this.createHole(object);
        case 'fliptarget':
          return this.createFlipTarget(object);
        case 'lightgroup':
          return this.createLightGroup(object);
        case 'slingshot':
          return this.createSlingshot(object);
        case 'trigger':
          return this.createTrigger(object);
      }
    };

    ComponentFactory.prototype.get = function(id) {
      return this.objects[id];
    };

    ComponentFactory.prototype.registerObject = function(object) {
      var id;
      id = object.getID();
      this.objects[id] = object;
      return object;
    };

    ComponentFactory.prototype.createBall = function() {
      var ball;
      ball = new Pinball.Entities.Ball(this.game, {
        material: this.materials.ballMaterial
      });
      return this.registerObject(ball);
    };

    ComponentFactory.prototype.createTrigger = function(object) {
      var trigger;
      trigger = new Pinball.Base.Trigger(this.game, object);
      return this.registerObject(trigger);
    };

    ComponentFactory.prototype.createBumper = function(object) {
      var bumper;
      bumper = new Pinball.Base.Bumper(this.game, object, this.materials.bumperMaterial);
      return this.registerObject(bumper);
    };

    ComponentFactory.prototype.createLight = function(object) {
      var light;
      light = new Pinball.Base.Light(this.game, object);
      return this.registerObject(light);
    };

    ComponentFactory.prototype.createRollover = function(object) {
      var rollover;
      rollover = new Pinball.Base.Rollover(this.game, object);
      return this.registerObject(rollover);
    };

    ComponentFactory.prototype.createTarget = function(object) {
      var target;
      target = new Pinball.Base.Target(this.game, object);
      return this.registerObject(target);
    };

    ComponentFactory.prototype.createHole = function(object) {
      var hole;
      hole = new Pinball.Base.Hole(this.game, object);
      return this.registerObject(hole);
    };

    ComponentFactory.prototype.createFlipTarget = function(object) {
      var fliptarget;
      fliptarget = new Pinball.Base.FlipTarget(this.game, object);
      return this.registerObject(fliptarget);
    };

    ComponentFactory.prototype.createLightGroup = function(options) {
      var light, lightGroup, _i, _len, _ref;
      lightGroup = new Pinball.Base.LightGroup(this.game, options);
      _ref = options.lights;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        light = _ref[_i];
        lightGroup.addLight(this.get(light));
      }
      return this.registerObject(lightGroup);
    };

    ComponentFactory.prototype.createSlingshot = function(options) {
      var slingshot;
      slingshot = new Pinball.Base.Slingshot(this.game, options, this.materials.slingshotMaterial);
      return this.registerObject(slingshot);
    };

    return ComponentFactory;

  })();

}).call(this);

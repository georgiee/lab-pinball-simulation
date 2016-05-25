(function() {
  Pinball.PhysicsUtils = (function() {
    function PhysicsUtils() {}

    PhysicsUtils.debugBody = function(game, body) {
      var debugBody;
      return debugBody = new Phaser.Physics.P2.BodyDebug(game, body);
    };

    PhysicsUtils.addFixtureToBody = function(game, body, fixtureData) {
      var cm, generatedShapes, i, j, offset, polygons, s, shape, shapes, v, vertices, world, _i, _len;
      world = game.physics.p2;
      generatedShapes = [];
      if (fixtureData.circle) {
        shape = new p2.Circle(world.pxm(fixtureData.circle.radius));
        shape.collisionGroup = fixtureData.filter.categoryBits;
        shape.collisionMask = fixtureData.filter.maskBits;
        shape.sensor = fixtureData.isSensor;
        offset = p2.vec2.create();
        offset[0] = world.pxmi(fixtureData.circle.position[0]);
        offset[1] = world.pxmi(fixtureData.circle.position[1]);
        body.addShape(shape, offset);
        generatedShapes.push(shape);
      } else {
        polygons = fixtureData.polygons;
        cm = p2.vec2.create();
        i = 0;
        for (_i = 0, _len = polygons.length; _i < _len; _i++) {
          shapes = polygons[_i];
          vertices = [];
          s = 0;
          while (s < shapes.length) {
            vertices.push([world.pxmi(shapes[s]), world.pxmi(shapes[s + 1])]);
            s += 2;
          }
          shape = new p2.Convex(vertices);
          j = 0;
          while (j !== shape.vertices.length) {
            v = shape.vertices[j];
            p2.vec2.sub(v, v, shape.centerOfMass);
            j++;
          }
          p2.vec2.scale(cm, shape.centerOfMass, 1);
          shape.updateTriangles();
          shape.updateCenterOfMass();
          shape.updateBoundingRadius();
          shape.collisionGroup = fixtureData.filter.categoryBits;
          shape.collisionMask = fixtureData.filter.maskBits;
          shape.sensor = fixtureData.isSensor;
          body.addShape(shape, cm);
          generatedShapes.push(shape);
        }
      }
      return generatedShapes;
    };

    return PhysicsUtils;

  })();

}).call(this);

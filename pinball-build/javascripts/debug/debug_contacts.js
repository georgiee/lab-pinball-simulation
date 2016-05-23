(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Core.DebugP2Contacts = (function(_super) {
    __extends(DebugP2Contacts, _super);

    function DebugP2Contacts(game, x, y) {
      DebugP2Contacts.__super__.constructor.call(this, game, 0, 0);
      this.p2world = this.game.physics.p2;
      this.update();
    }

    DebugP2Contacts.prototype.preUpdate = function() {
      var angle, bodyA, bodyB, contactPointA, contactPointB, d, d2, eq, normalA, nx, ny, slope, x1, x2, xAxis, xi, xj, y1, y2, yAxis, yi, yj, _i, _len, _ref;
      DebugP2Contacts.__super__.preUpdate.apply(this, arguments);
      this.lineStyle(10, 0xff0000, 1);
      _ref = this.p2world.world.narrowphase.contactEquations;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        eq = _ref[_i];
        bodyA = eq.bi;
        bodyB = eq.bj;
        contactPointA = eq.ri;
        contactPointB = eq.rj;
        normalA = eq.ni;
        if (eq.firstImpact) {
          nx = this.p2world.mpxi(normalA[0]);
          ny = this.p2world.mpxi(normalA[1]);
          yAxis = p2.vec2.fromValues(0, 1);
          xAxis = p2.vec2.fromValues(1, 0);
          d = p2.vec2.dot(normalA, yAxis);
          d2 = p2.vec2.dot(normalA, xAxis);
          console.log('normalA', normalA);
          slope = normalA[1] / normalA[0];
          angle = Math.tan(slope) * 180 / Math.PI;
          xi = this.p2world.mpxi(bodyA.position[0]);
          yi = this.p2world.mpxi(bodyA.position[1]);
          this.moveTo(xi, yi);
          this.lineTo(xi + nx * 10, yi + ny * 10);
        }
        return;
        xi = this.p2world.mpxi(bodyA.position[0]);
        yi = this.p2world.mpxi(bodyA.position[1]);
        xj = this.p2world.mpxi(bodyB.position[0]);
        yj = this.p2world.mpxi(bodyB.position[1]);
        x1 = xi + this.p2world.mpxi(contactPointA[0]);
        y1 = yi + this.p2world.mpxi(contactPointA[1]);
        x2 = xj + this.p2world.mpxi(contactPointB[0]);
        y2 = yj + this.p2world.mpxi(contactPointB[1]);
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);
      }
    };

    return DebugP2Contacts;

  })(Phaser.Graphics);

}).call(this);

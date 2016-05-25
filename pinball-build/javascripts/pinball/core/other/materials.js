(function() {
  Pinball.Core.Materials = (function() {
    function Materials(game) {
      this.game = game;
      this.world = this.game.physics.p2;
      this.createMaterials();
      this.createBumperBallContact();
      this.createSlingshotBallContact();
      this.createFlipperBallContact();
    }

    Materials.prototype.createMaterials = function() {
      this.ballMaterial = this.game.physics.p2.createMaterial('ball');
      this.flipperMaterial = this.game.physics.p2.createMaterial('flipper');
      this.bumperMaterial = this.game.physics.p2.createMaterial('bumper');
      return this.slingshotMaterial = this.game.physics.p2.createMaterial('slingshot');
    };

    Materials.prototype.createBumperBallContact = function() {
      this.bumperBallContact = this.world.createContactMaterial(this.bumperMaterial, this.ballMaterial);
      this.bumperBallContact.friction = 1;
      return this.bumperBallContact.restitution = 1.2;
    };

    Materials.prototype.createSlingshotBallContact = function() {
      this.slingshotBallContact = this.world.createContactMaterial(this.slingshotMaterial, this.ballMaterial);
      this.slingshotBallContact.friction = 0;
      return this.slingshotBallContact.restitution = 1.8;
    };

    Materials.prototype.createFlipperBallContact = function() {
      this.flipperBallContact = this.world.createContactMaterial(this.flipperMaterial, this.ballMaterial);
      this.flipperBallContact.friction = 1;
      return this.flipperBallContact.restitution = 0;
    };

    return Materials;

  })();

}).call(this);

(function() {
  Pinball.Bits = {
    NOTHING: 0,
    TABLE: 0x1,
    BALL: 0x2,
    RAMP_UPPER: 0x4,
    RAMP_LOWER: 0x8,
    RAMP_CENTER: 0x10,
    FLIPPER: 0x20,
    RAMP_ACTIVE: 0x40,
    RAMP_INACTIVE: 0x80,
    groups: {
      TABLE: function() {
        return Pinball.Bits.TABLE | Pinball.Bits.FLIPPER | Pinball.Bits.RAMP_INACTIVE;
      },
      RAMP_LOWER: function() {
        return Pinball.Bits.RAMP_ACTIVE | Pinball.Bits.RAMP_LOWER;
      },
      RAMP_UPPER: function() {
        return Pinball.Bits.RAMP_ACTIVE | Pinball.Bits.RAMP_UPPER;
      },
      RAMP_CENTER: function() {
        return Pinball.Bits.RAMP_ACTIVE | Pinball.Bits.RAMP_CENTER;
      }
    }
  };

}).call(this);

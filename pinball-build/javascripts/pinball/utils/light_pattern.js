(function() {
  Pinball.LightPattern = (function() {
    function LightPattern(pattern) {
      if (pattern == null) {
        pattern = '~';
      }
      pattern = pattern.split("#");
      this.delay = parseInt(pattern[1]) || 250;
      this.baseOffset = parseInt(pattern[2]) || 50;
      this.pattern = pattern[0].split("");
      this.length = this.pattern.length;
    }

    LightPattern.prototype.getDelay = function() {
      return this.delay;
    };

    LightPattern.prototype.getOffset = function(index) {
      var flag;
      flag = this.getFlag(index);
      return flag * this.baseOffset;
    };

    LightPattern.prototype.getFlag = function(index) {
      var flag;
      flag = this.pattern[index % this.length];
      if (flag === '~') {
        return index;
      }
      return flag = parseInt(flag, 16);
    };

    return LightPattern;

  })();

}).call(this);

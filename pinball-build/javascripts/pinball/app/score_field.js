(function() {
  var language,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  language = {
    delimiters: {
      thousands: '.',
      decimal: ','
    },
    abbreviations: {
      thousand: 'k',
      million: 'm',
      billion: 'b',
      trillion: 't'
    },
    ordinal: function(number) {
      return '.';
    },
    currency: {
      symbol: '€'
    }
  };

  numeral.language('de', language);

  Pinball.ScoreField = (function(_super) {
    __extends(ScoreField, _super);

    function ScoreField() {
      return ScoreField.__super__.constructor.apply(this, arguments);
    }

    ScoreField.prototype.initialize = function(options) {
      numeral.language('de');
      return this.set(options.initialScore || 0);
    };

    ScoreField.prototype.set = function(value) {
      return this.$el.html(numeral(value).format('0,0'));
    };

    return ScoreField;

  })(Backbone.View);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.DebugApp = (function(_super) {
    __extends(DebugApp, _super);

    function DebugApp() {
      this.changeTheme = __bind(this.changeTheme, this);
      return DebugApp.__super__.constructor.apply(this, arguments);
    }

    DebugApp.prototype.el = '#pinball-debug';

    DebugApp.prototype.events = {
      'change .theme-select': 'changeTheme'
    };

    DebugApp.prototype.initialize = function(options) {
      return this.app = options.app;
    };

    DebugApp.prototype.changeTheme = function(e) {
      return this.app.getInterface().trigger('change.theme', $(e.target).val());
    };

    return DebugApp;

  })(Backbone.View);

}).call(this);

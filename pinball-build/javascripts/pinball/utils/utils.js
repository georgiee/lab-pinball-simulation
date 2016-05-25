(function() {
  Pinball.Utils = (function() {
    function Utils() {}

    Utils.getParameterByName = function(name) {
      var regex, results;
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      results = regex.exec(location.search);
      if (results === null) {
        return void 0;
      } else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
      }
    };

    return Utils;

  })();

}).call(this);

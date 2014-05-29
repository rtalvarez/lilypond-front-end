(function() {
  window.helper = {};

  helper.note = function(pitch, duration) {
    this.pitch = pitch;
    return this.duration = duration;
  };

  helper.staffMeasure = function(events, notes) {
    this.events = events;
    return this.notes = notes;
  };

  helper.metaMeasure = function(events) {
    return this.events = events;
  };

  helper.animateKey = function(key) {
    var element;
    key = helper["class"](helper.keycode(key));
    element = $('.' + key);
    element.toggleClass('dark');
    setTimeout(function() {
      return element.toggleClass('dark');
    }, 50);
    return key;
  };

  helper.events = function(key) {
    return helper.animateKey(key);
  };

  helper.keycode = function(code) {
    if (code === 59) {
      return ';';
    } else if (code === 44) {
      return ',';
    } else if (code === 46) {
      return '.';
    } else if (code === 47) {
      return '/';
    }
    return 'abcdefghijklmnopqrstuvwxyz'[code - 65];
  };

  helper["class"] = function(char) {
    if (char === ';') {
      return 'semc';
    } else if (char === '.') {
      return 'dot';
    } else if (char === '/') {
      return 'slash';
    } else if (char === ',') {
      return 'comma';
    }
    return char;
  };

}).call(this);

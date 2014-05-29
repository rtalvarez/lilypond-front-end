(function() {
  var fs;

  fs = require('fs');

  require('nw.gui').Window.get().showDevTools();

  angular.module('app', ['leftBar', 'documentView']).controller('mainCtrl', function($scope, dataFactory) {
    $scope.$on('leftChange', function(value) {
      var key, timeSig;
      timeSig = value.targetScope.ngModel.time;
      key = value.targetScope.ngModel.key;
      return dataFactory.meta.measures[0].events.time = {
        n: timeSig.top,
        d: timeSig.bottom,
        key: key
      };
    });
    $scope.click = function(event) {
      var key;
      key = event.target.className;
      return helper.animateKey(key);
    };
    return $scope.leftBarModel = {
      key: 0,
      time: {
        top: 4,
        bottom: 4
      },
      staves: [
        {
          clef: 'treble'
        }
      ]
    };
  }).directive('ngTrack', function() {
    var staffNum;
    staffNum = 0;
    return {
      restrict: 'EA',
      replace: true,
      scope: true,
      templateUrl: 'staff.html',
      controller: function($scope, $element, $compile) {
        $element.keydown(function(event) {
          var el, key;
          key = helper.animateKey(event.which);
          if (key === 'z') {
            el = $compile('<div ng-track tabindex="0"></div>')($scope);
            return $element.parent().append(el);
          } else {
            console.log(key);
            return $scope.test += key;
          }
        });
        return {
          link: function(scope) {
            return scope.test = ++staffNum;
          }
        };
      }
    };
  }).factory('dataFactory', function() {
    var barline, clef, data, duration, events, key, measure, measures, meta, note, notes, pitch, staff, staves, time;
    pitch = 52;
    clef = 'treble';
    barline = 'some string';
    time = {
      n: 3,
      d: 4
    };
    key = -3;
    data = {};
    duration = {};
    note = {
      pitch: pitch,
      duration: duration
    };
    events = {
      clef: clef
    };
    notes = [note];
    measure = {
      events: events,
      notes: notes
    };
    measures = [measure];
    staff = {
      measures: measures
    };
    staves = [staff];
    data.staves = staves;
    events = {
      key: key,
      time: time,
      barline: barline
    };
    measure = {
      events: events
    };
    measures = [measure];
    meta = {
      measures: measures
    };
    data.meta = meta;
    return data;
  }).controller('IOCtrl', function(dataFactory) {
    $('#loadFile').on('click', function() {
      return LZADialog.selectFile({}, function(file) {
        var data, dir, filename, path;
        path = file.path;
        filename = file.name;
        dir = path.replace(filename, '');
        data = new FileReader();
        data.readAsText(file);
        return data.onloadend = function() {
          var e, fileContents;
          try {
            console.log(dataFactory);
            fileContents = JSON.parse(data.result);
            dataFactory = fileContents;
            alert('Load file OK');
            return console.log(dataFactory);
          } catch (_error) {
            e = _error;
            return alert('Unreadable file: ' + e);
          }
        };
      });
    });
    return $('#saveFile').on('click', function() {
      return LZADialog.saveFileAs(function(file) {
        var dir, filename, path;
        path = file.path;
        filename = file.name;
        dir = path.replace(filename, '');
        if (!filename.match('.json')) {
          filename = filename + '.json';
        }
        return fs.writeFile(dir + filename, JSON.stringify(dataFactory), function(err) {
          if (err) {
            return alert(err);
          } else {
            return alert('Saved file in: ' + dir + filename);
          }
        });
      });
    });
  });

}).call(this);

// jshint esversion: 6

var fs = require('fs');
var path = require('path');

var errno = require("./errno");
var pathUtil = require("./utils/path-util");

var aetherDriveSettingsFile = path.join("resources", "settings.json");
var aetherDriveSettings = null;
var fsWatcher = null;

function saveSettings(settings) {
  var tempSettings = settings || { default: {} };
  if (!tempSettings.default.aether_drive_root) {
    tempSettings.default.aether_drive_root = path.join(pathUtil.getUserHome(), "aether-drive");
  }
  fs.writeFile(aetherDriveSettingsFile, JSON.stringify(tempSettings), function(err) {
    if (err) {
      tempSettings = null;
    }
    return tempSettings;
  });
}

function initialize() {
  fsWatcher = fs.watch(aetherDriveDir, {recursive: true}, (eventType, filename) => {
    if (filename) {
      console.log(eventType + ": " + filename);
    }
  });
}

fs.readFile(aetherDriveSettingsFile, function processSettings(err, data) {
  aetherDriveSettings = saveSettings(err ? null : JSON.parse(data));
  if (!aetherDriveSettings) {
    process.exit(errno.EIO.code);
  }
  console.log(aetherDriveSettings);
});

return;

fs.access(aetherDriveDir, fs.constants.F_OK, (err) => {
  if (err) {
    fs.mkdir(aetherDriveDir, (err) => {
      if (err) {
        console.error("Cannot create Aether Drive directory at " + aetherDriveDir + ".");
      } else {
        initialize();
      }
    });
  } else {
    initialize();
  }
});

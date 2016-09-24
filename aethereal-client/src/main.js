// jshint esversion: 6

var fs = require('fs');
var path = require('path');

var aetherDriveDir = path.join(getUserHome(), "aether-drive");
var fsWatcher = null;

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

function initialize() {
  fsWatcher = fs.watch(aetherDriveDir, {recursive: true}, (eventType, filename) => {
    if (filename) {
      console.log(eventType + ": " + filename);
    }
  });
}

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

var path = require("path");

module.exports = {
  getUserHome: function() {
    return path.resolve(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE);
  }
};

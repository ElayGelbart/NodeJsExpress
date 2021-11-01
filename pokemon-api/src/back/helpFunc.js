const fs = require('fs')

const checkDir = (dir) => {
  try {
    fs.accessSync(dir);
    return true;
  }
  catch (error) {
    return false;
  }
}

module.exports.checkDir = checkDir;
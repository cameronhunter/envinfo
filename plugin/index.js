const fs = require('fs');
const path = require('path');

module.exports = fs
  .readdirSync(__dirname)
  .filter(filename => filename !== 'index.js')
  .map(filename => path.resolve(__dirname, filename));

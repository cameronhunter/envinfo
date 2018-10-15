module.exports = utils => ({
  name: 'CMake',

  get filter() {
    return process.platform === 'darwin' || process.platform === 'linux';
  },

  get version() {
    return utils.run('gcc -v 2>&1').then(utils.findVersion);
  },

  get path() {
    return utils.run('which gcc');
  },
});

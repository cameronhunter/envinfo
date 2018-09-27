module.exports = utils => ({
  name: 'CMake',

  get filter() {
    return process.platform === 'darwin' || process.platform === 'linux';
  },

  get version() {
    return utils.run('cmake --version').then(utils.findVersion);
  },

  get path() {
    return utils.run('which cmake');
  },
});

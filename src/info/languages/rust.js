module.exports = utils => ({
  name: 'Rust',

  get filter() {
    return process.platform === 'darwin' || process.platform === 'linux';
  },

  get version() {
    return utils.run('rustup --version').then(utils.findVersion);
  },

  get path() {
    return utils.run('which rustup');
  },
});

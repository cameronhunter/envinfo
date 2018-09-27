module.exports = utils => ({
  name: 'Parallels',

  get version() {
    return utils.run('prlctl --version').then(utils.findVersion);
  },

  get path() {
    return utils.which('prlctl');
  },
});

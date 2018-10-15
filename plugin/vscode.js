module.exports = utils => ({
  name: 'VSCode',

  get version() {
    return utils.run('code --version').then(utils.findVersion);
  },

  get path() {
    return utils.which('code');
  },
});

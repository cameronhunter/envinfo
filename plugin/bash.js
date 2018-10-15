module.exports = utils => ({
  name: 'Bash',

  get version() {
    return utils.run('bash --version').then(utils.findVersion);
  },

  get path() {
    return utils.which('bash');
  },
});

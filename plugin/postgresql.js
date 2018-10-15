module.exports = utils => ({
  name: 'PostgreSQL',

  get version() {
    return utils.run('postgres --version').then(utils.findVersion);
  },

  get path() {
    return utils.which('postgres');
  },
});

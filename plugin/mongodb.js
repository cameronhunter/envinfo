module.exports = utils => ({
  name: 'MongoDB',

  get version() {
    return utils.run('mongo --version').then(utils.findVersion);
  },

  get path() {
    return utils.which('mongo');
  },
});

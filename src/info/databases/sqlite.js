module.exports = utils => ({
  name: 'SQLite',

  get version() {
    return utils.run('sqlite3 --version').then(utils.findVersion);
  },

  get path() {
    return utils.which('sqlite3');
  },
});

module.exports = utils => ({
  name: 'MySQL',

  get version() {
    return utils
      .run('mysql --version')
      .then(v => `${utils.findVersion(v, null, 1)}${v.includes('MariaDB') ? ' (MariaDB)' : ''}`);
  },

  get path() {
    return utils.which('mysql');
  },
});

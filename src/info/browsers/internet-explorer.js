module.exports = utils => ({
  name: 'Internet Explorer',

  get filter() {
    return process.platform.startsWith('win');
  },

  get version() {
    const explorerPath = [
      process.env.SYSTEMDRIVE || 'C:',
      'Program Files',
      'Internet Explorer',
      'iexplore.exe',
    ].join('\\\\');

    return utils
      .run(`wmic datafile where "name='${explorerPath}'" get Version`)
      .then(utils.findVersion);
  },
});

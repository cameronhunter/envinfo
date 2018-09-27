module.exports = utils => ({
  name: 'VirtualBox',

  get version() {
    return utils.run('vboxmanage --version').then(utils.findVersion);
  },

  get path() {
    return utils.which('vboxmanage');
  },
});

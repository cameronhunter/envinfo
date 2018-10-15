module.exports = utils => ({
  name: 'VMWare Fusion',

  get version() {
    return utils.getDarwinApplicationVersion('com.vmware.fusion');
  },
});

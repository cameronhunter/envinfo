module.exports = utils => ({
  name: 'Chrome',

  get filter() {
    return process.platform === 'darwin' || process.platform === 'linux';
  },

  get version() {
    switch (process.platform) {
      case 'darwin':
        return utils.getDarwinApplicationVersion('com.google.Chrome').then(utils.findVersion);

      case 'linux':
        return utils.run('google-chrome --version').then(v => v.replace(/^.* ([^ ]*)/g, '$1'));

      default:
        return Promise.reject(new Error(`Unsupported platform "${process.platform}"`));
    }
  },
});

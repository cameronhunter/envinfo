module.exports = utils => ({
  name: 'Xcode',

  get filter() {
    return process.platform === 'darwin';
  },

  get version() {
    return utils
      .which('xcodebuild')
      .then(xcodePath => utils.run(xcodePath + ' -version'))
      .then(version => `${utils.findVersion(version)}/${version.split('Build version ')[1]}`);
  },

  get path() {
    return utils.which('xcodebuild');
  },
});

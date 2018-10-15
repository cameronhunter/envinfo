const NotFound = 'Not Found';

module.exports = utils => ({
  name: 'iOS SDK',

  get filter() {
    return process.platform === 'darwin';
  },

  get info() {
    return utils
      .run('xcodebuild -showsdks')
      .then(sdks => sdks.match(/[\w]+\s[\d|.]+/g))
      .then(utils.uniq)
      .then(platforms => (platforms.length ? { Platforms: platforms } : NotFound));
  },
});

module.exports = utils => ({
  name: 'Node',

  get version() {
    return utils
      .which('node')
      .then(nodePath => (nodePath ? utils.run(nodePath + ' -v') : Promise.resolve('')))
      .then(v => v.replace('v', ''));
  },

  get path() {
    return utils.which('node').then(utils.condensePath);
  },
});

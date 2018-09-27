const os = require('os');

module.exports = utils => ({
  name: 'Edge',

  get filter() {
    return process.platform.startsWith('win') && os.release().split('.')[0] === '10';
  },

  get version() {
    return utils.run('powershell get-appxpackage Microsoft.MicrosoftEdge').then(utils.findVersion);
  },
});

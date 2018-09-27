const os = require('os');
const osName = require('os-name');

module.exports = utils => ({
  name: 'OS',

  get info() {
    let version;
    if (process.platform === 'darwin') {
      version = utils.run('sw_vers -productVersion ');
    } else if (process.platform === 'linux') {
      version = utils.run('cat /etc/os-release').then(v => {
        const distro = (v || '').match(/NAME="(.+)"/);
        const versionInfo = (v || '').match(/VERSION="(.+)"/) || [];
        return `${distro[1]} ${versionInfo[1]}`.trim() || '';
      });
    } else {
      version = Promise.resolve();
    }

    return version.then(v => {
      let info = osName(os.platform(), os.release());
      if (v) info += ` ${v}`;
      return info;
    });
  },
});

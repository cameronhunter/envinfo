const path = require('path');

const NotFound = 'Not Found';

module.exports = utils => ({
  name: 'Android Studio',

  get version() {
    if (process.platform === 'darwin') {
      return utils
        .run(
          utils.generatePlistBuddyCommand(
            path.join('/', 'Applications', 'Android\\ Studio.app', 'Contents', 'Info.plist'),
            ['CFBundleShortVersionString', 'CFBundleVersion']
          )
        )
        .then(version => version.split('\n').join(' '));
    }

    if (process.platform === 'linux') {
      return Promise.all([
        utils
          .run('cat /opt/android-studio/bin/studio.sh | grep "$Home/.AndroidStudio" | head -1')
          .then(utils.findVersion),
        utils.run('cat /opt/android-studio/build.txt'),
      ]).then(tasks => {
        const linuxVersion = tasks[0];
        const linuxBuildNumber = tasks[1];
        return `${linuxVersion} ${linuxBuildNumber}`.trim() || NotFound;
      });
    }

    if (process.platform.startsWith('win')) {
      return Promise.all([
        utils
          .run(
            'wmic datafile where name="C:\\\\Program Files\\\\Android\\\\Android Studio\\\\bin\\\\studio.exe" get Version'
          )
          .then(version => version.replace(/(\r\n|\n|\r)/gm, '')),
        utils
          .run('type "C:\\\\Program Files\\\\Android\\\\Android Studio\\\\build.txt"')
          .then(version => version.replace(/(\r\n|\n|\r)/gm, '')),
      ]).then(tasks => {
        const windowsVersion = tasks[0];
        const windowsBuildNumber = tasks[1];
        return `${windowsVersion} ${windowsBuildNumber}`.trim() || NotFound;
      });
    }

    return Promise.reject(new Error(`Unsupported platform "${process.platform}"`));
  },
});

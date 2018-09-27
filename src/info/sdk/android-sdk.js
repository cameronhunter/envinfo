const NotFound = 'Not Found';
const getBuildVersions = /build-tools;([\d|.]+)[\S\s]/g;
const getAPIVersions = /platforms;android-(\d+)[\S\s]/g;

module.exports = utils => ({
  name: 'Android SDK',

  get info() {
    return utils
      .run(
        process.env.ANDROID_HOME ? '$ANDROID_HOME/tools/bin/sdkmanager --list' : 'sdkmanager --list'
      )
      .then(output => {
        const buildTools = [];
        const androidAPIs = [];
        const installed = output.split('Available')[0];

        let matcher;

        // eslint-disable-next-line
        while ((matcher = getBuildVersions.exec(installed))) {
          buildTools.push(matcher[1]);
        }

        // eslint-disable-next-line
        while ((matcher = getAPIVersions.exec(installed))) {
          androidAPIs.push(matcher[1]);
        }

        if (buildTools.length || androidAPIs.length) {
          return Promise.resolve({
            'Build Tools': buildTools || NotFound,
            'API Levels': androidAPIs || NotFound,
          });
        }

        return Promise.resolve(NotFound);
      });
  },
});

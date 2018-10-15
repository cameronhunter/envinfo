const glob = require('glob');
const path = require('path');

module.exports = (utils, options, packages) => ({
  name: 'Global npm packages',

  get info() {
    let packageGlob = null;

    if (typeof packages === 'string') {
      if (
        // detect characters that are not allowed in npm names, but are in globs
        // wont work if the exactly once glob @ is used by itself, because of npm namespacing
        packages.includes('*') ||
        packages.includes('?') ||
        packages.includes('+') ||
        packages.includes('!')
      ) {
        packageGlob = packages;
      } else {
        packages = packages.split(',');
      }
    } else if (!Array.isArray(packages)) {
      packages = true;
    }

    return Promise.all(
      utils
        // get the location of the npm global node_modules
        .run('npm get prefix --global')
        // glob all of the package.json files in that directory
        .then(
          prefix =>
            new Promise((resolve, reject) =>
              glob(
                // sub packageGlob in to only get globbed packages if not null
                path.join(prefix, 'lib', 'node_modules', packageGlob || '*', 'package.json'),
                (err, files) => {
                  if (!err) resolve(files);
                  reject(err);
                }
              )
            )
        )
        .then(globResults =>
          Promise.all(
            globResults
              // filter out package paths not in list provided in options
              .filter(
                globbedPath =>
                  typeof packages === 'boolean' ||
                  packageGlob !== null ||
                  packages.includes(globbedPath.split('/').slice(-2)[0])
              )
              // get all the package.json by path, return promises
              .map(packageJson => utils.getPackageJsonByFullPath(packageJson))
          )
        )
        // accumulate all the package info in one object.
        .then(allPackages =>
          allPackages.reduce(
            (acc, json) => (json ? Object.assign(acc, { [json.name]: json.version }) : acc),
            {}
          )
        )
        .then(versions => {
          if (options.showNotFound) {
            packages.forEach(p => {
              if (!versions[p]) {
                versions[p] = 'Not Found';
              }
            });
          }
          return versions;
        })
    );
  },
});

const path = require('path');

module.exports = (utils, options, packages) => ({
  name: 'npm packages',

  get info() {
    if (!options) options = {};

    let packageGlob = null;
    let tld = null;

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
    }

    return Promise.all(
      utils
        .getPackageJsonByPath('package.json')
        .then(packageJson =>
          Object.assign(
            {},
            (packageJson || {}).devDependencies || {},
            (packageJson || {}).dependencies || {}
          )
        )
        // determine which paths to get
        .then(packageJsonDependencies => {
          tld = packageJsonDependencies;
          if (options.fullTree || options.duplicates || packageGlob) {
            return utils.getAllPackageJsonPaths(packageGlob);
          }
          return Promise.resolve(
            Object.keys(packageJsonDependencies || []).map(dep =>
              path.join('node_modules', dep, 'package.json')
            )
          );
        })
        // filter by glob or selection
        .then(packageJsonPaths => {
          if ((packageGlob || typeof packages === 'boolean') && !options.fullTree) {
            return Promise.resolve(
              (packageJsonPaths || []).filter(p =>
                Object.keys(tld || []).includes(p.split('/').slice(-2)[0])
              )
            );
          }
          if (Array.isArray(packages)) {
            return Promise.resolve(
              (packageJsonPaths || []).filter(p => packages.includes(p.split('/').slice(-2)[0]))
            );
          }
          return Promise.resolve(packageJsonPaths);
        })
        .then(paths =>
          Promise.all([
            paths,
            Promise.all(paths.map(filePath => utils.getPackageJsonByPath(filePath))),
          ])
        )
        // conglomerate the data
        .then(result => {
          const paths = result[0];
          const files = result[1];

          return files.reduce((acc, d, idx) => {
            // if the file is a test stub, or doesn't have a name, ignore it.
            if (!d || !d.name) return acc;
            // create object if its not already created
            if (!acc[d.name]) acc[d.name] = {};
            // set duplicates if flag set, if version not already there, && !== installed
            if (options.duplicates) {
              if (acc[d.name].installed && acc[d.name].installed !== d.version) {
                utils.uniq(
                  (acc[d.name].duplicates = (acc[d.name].duplicates || []).concat(d.version))
                );
              }
            }
            // set the installed version, if its installed top level
            if ((paths[idx].match(/node_modules/g) || []).length === 1)
              acc[d.name].installed = d.version;
            // if it is a top level dependency, get the wanted version
            if (tld[d.name]) acc[d.name].wanted = tld[d.name];
            return acc;
          }, {});
        })
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
        .then(versions => utils.sortObject(versions))
    );
  },
});

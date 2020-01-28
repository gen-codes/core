import npm from 'npm';
import fs from 'fs';
import path from 'path';
import semver from 'semver';
const LOAD_ERR    = 'NPM_LOAD_ERR';
const INSTALL_ERR = 'NPM_INSTALL_ERR';
const VIEW_ERR    = 'NPM_VIEW_ERR';

const npmi = (options, callback = () => {}) => {
    const name         = options.name;
    const pkgName      = options.pkgName || name;
    const version      = options.version || 'latest';
    const installPath  = options.path || '.';
    const forceInstall = options.forceInstall || false;
    const localInstall = options.localInstall || false;
    const npmLoad      = options.npmLoad || {loglevel: 'silent'};
    let savedPrefix  = null;

    function viewCallback(installedVersion)  {
        return (err, view) => {
            if (err) {
                // reset npm.prefix to saved value
                npm.prefix = savedPrefix;
                err.code = VIEW_ERR;
                return callback(err);
            }

            // npm view success
            const latestVersion = Object.keys(view)[0];
            if ((typeof latestVersion !== 'undefined') && (latestVersion === installedVersion)) {
                // reset npm.prefix to saved value
                npm.prefix = savedPrefix;
                return callback();
            } else {
                npm.commands.install(installPath, [`${name}@${latestVersion}`], installCallback);
            }
        };
    }

    function checkInstalled(isTarball) {
        let module = `${name}@${version}`;

        if (isTarball) {
            module = name;
            // if (pkgName === name) {
            //     console.warn(`npmi warn: install "${name}" from tarball/folder without options.pkgName specified => forceInstall: true`);
            // }
        }

        // check that version matches
        fs.readFile(path.resolve(installPath, 'node_modules', pkgName, 'package.json'), (err, pkgRawData) => {
            if (err) {
                // hmm, something went wrong while reading module's package.json file
                // lets try to reinstall it just in case
                return npm.commands.install(installPath, [module], installCallback);
            }

            const pkg = JSON.parse(pkgRawData);
            if (version === 'latest') {
                // specified version is "latest" which means nothing for a comparison check
                if (isTarball) {
                    // when a package is already installed and it comes from a tarball, you have to specify
                    // a real version => warn
                    // console.warn('npmi warn: install from tarball without options.version specified => forceInstall: true');
                    return npm.commands.install(installPath, [module], installCallback);
                } else {
                    // so we need to ask npm to give us a view of the module from remote registry
                    // in order to check if it really is the latest one that is currently installed
                    return npm.commands.view([name], true, viewCallback(pkg.version));
                }

            } else if (pkg.version === version) {
                // package is installed and version matches
                // reset npm.prefix to saved value
                npm.prefix = savedPrefix;
                return callback();

            } else {
                // version does not match: reinstall
                return npm.commands.install(installPath, [module], installCallback);
            }
        });
    }

    function installCallback(err, result) {
        // reset npm.prefix to saved value
        npm.prefix = savedPrefix;

        if (err) {
            err.code = INSTALL_ERR;
        }

        callback(err, result);
    }

    function loadCallback(err) {
        if (err) {
            err.code = LOAD_ERR;
            return callback(err);
        }

        // npm loaded successfully
        savedPrefix = npm.prefix; // save current npm.prefix
        npm.prefix = installPath; // change npm.prefix to given installPath
        if (!name) {
            // just want to do an "npm install" where a package.json is
            npm.commands.install(installPath, [], installCallback);

        } else if (localInstall) {
            if (forceInstall) {
                // local install won't work with version specified
                npm.commands.install(installPath, [name], installCallback);
            } else {
                // check if there is already a local install of this module
                fs.readFile(path.resolve(name, 'package.json'), 'utf8', (err, sourcePkgData) => {
                    if (err) {
                        // reset npm.prefix to saved value
                        npm.prefix = savedPrefix;
                        callback(err);

                    } else {
                        try {
                            var sourcePkg = JSON.parse(sourcePkgData)
                        } catch (err) {
                            // reset npm.prefix to saved value
                            npm.prefix = savedPrefix;
                            callback(err);
                            return;
                        }

                        const pkgName = sourcePkg.name || path.basename(name);
                        fs.readFile(path.resolve(installPath, 'node_modules', pkgName, 'package.json'), 'utf8', (err, targetPkgData) => {
                            if (err) {
                                // file probably doesn't exist, or is corrupted: install
                                // local install won't work with version specified
                                npm.commands.install(installPath, [name], installCallback);
                            } else {
                                // there is a module that looks a lot like the one you want to install: do some checks
                                try {
                                    var targetPkg = JSON.parse(targetPkgData);
                                } catch (err) {
                                    // reset npm.prefix to saved value
                                    npm.prefix = savedPrefix;
                                    callback(err);
                                    return;
                                }

                                if (semver.gt(sourcePkg.version, targetPkg.version)) {
                                    // install because current found version seems outdated
                                    // local install won't work with version specified
                                    npm.commands.install(installPath, [name], installCallback);
                                } else {
                                    // reset npm.prefix to saved value
                                    npm.prefix = savedPrefix;
                                    callback();
                                }
                            }
                        });
                    }
                });
            }
        } else {
            if (forceInstall) {
                // reinstall package module
                if (!name.includes('/')) {
                    // not a tarball
                    npm.commands.install(installPath, [`${name}@${version}`], installCallback);
                } else {
                    // do not specify version for tarball
                    npm.commands.install(installPath, [name], installCallback);
                }

            } else {
                // check if package is installed
                checkInstalled(name.includes('/'));
            }
        }
    }

    npm.load(npmLoad, loadCallback);
};

npmi.LOAD_ERR    = LOAD_ERR;
npmi.INSTALL_ERR = INSTALL_ERR;
npmi.VIEW_ERR    = VIEW_ERR;

npmi.NPM_VERSION = npm.version;
const install = async (name, version, modulesPath)=>{
  const result = await new Promise((resolve,reject) => npmi({
    name,
    version,
    path: modulesPath,
    forceInstall: false,
    npmLoad: {
      loglevel: 'silent'	
    }
  }, function (error, result) {
      resolve({error, result})
  }))
  return result
}
export default install;
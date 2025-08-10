const path = require('path');
const fs = require('fs-extra');
const jszip = require('jszip');
const { ConsoleLogger } = require('@logtrine/logtrine');

module.exports = class CacheDirectoryManager {

    /**
     *
     * @param {string} applicationCacheDirectory
     * @param {Logger} logger
     */
    constructor(applicationCacheDirectory, logger) {
        try {
            this._logger = logger || new ConsoleLogger(ConsoleLogger.LEVEL.Warn);
            this._applicationCacheDirectory = path.normalize(applicationCacheDirectory);
            this._versionFile = path.join(this._applicationCacheDirectory, 'version');
        } catch(error) {
            this._applicationCacheDirectory = undefined;
            this._versionFile = undefined;
        }
    }

    /**
     * Extract an entry from an archive to the given directory
     * and resolve a promise with the path to the extracted file.
     * @param {JSZip} archive
     * @param {string} directory
     * @param {string} entry
     * @returns {Promise<void>} A promise that will resolve on success, otherwise reject with a related error
     */
    _extractZipEntry(archive, directory, entry) {
        if(!archive.files[entry].dir) {
            let file = path.join(directory, entry);
            this._logger.verbose('Extracting:', file);
            return fs.ensureDir(path.dirname(file))
                .then(() => archive.files[entry].async('uint8array'))
                .then(data => fs.writeFile(file, data));
        } else {
            return Promise.resolve();
        }
    }

    /**
     *
     * @returns {Promise<string>}
     */
    getCurrentVersion() {
        return fs.readFile(this._versionFile, 'utf8')
            .catch(() => Promise.resolve(undefined));
    }

    /**
     *
     * @param {string} version
     * @param {Uint8Array} data
     * @returns {void}
     */
    async applyUpdateArchive(version, data) {
        let zip = new jszip();
        let archive = await zip.loadAsync(data, {});

        // Safely remove directory with fallback mechanism
        try {
            // In Node.js 12.x, fs-extra's remove method should be used instead of fs.rm
            // fs.remove() should work in all fs-extra versions
            if (typeof fs.remove === 'function') {
                await fs.remove(this._applicationCacheDirectory);
            } else {
                // Fallback if fs.remove is not a function for some reason
                this._logger.warn('fs.remove function not found, using alternative removal method');
                throw new Error('fs.remove function not available');
            }
        } catch (error) {
            // Fallback to manual recursive deletion if fs.remove fails
            this._logger.warn('Failed to remove directory using fs.remove:', error);
            try {
                // Alternative implementation using rimraf-like approach
                const rimraf = util => {
                    if (fs.existsSync(util)) {
                        fs.readdirSync(util).forEach(file => {
                            const curPath = path.join(util, file);
                            if (fs.lstatSync(curPath).isDirectory()) {
                                rimraf(curPath);
                            } else {
                                fs.unlinkSync(curPath);
                            }
                        });
                        fs.rmdirSync(util);
                    }
                };
                rimraf(this._applicationCacheDirectory);
            } catch (e) {
                this._logger.error('Failed to remove directory using fallback method:', e);
            }
        }

        // Ensure directory exists before extracting
        await fs.ensureDir(this._applicationCacheDirectory);

        let entries = Object.keys(archive.files);
        let promises = entries.map(entry => this._extractZipEntry(archive, this._applicationCacheDirectory, entry));
        await Promise.all(promises);
        await fs.writeFile(this._versionFile, version);
    }
};
const tar = require('tar-stream');
const zlib = require('zlib');
const {nthback} = require('./nthBack');
const isStream = require('is-stream');
const fs = require('fs');
const path = require('path');

export default (files, {prefix = ''} = {}) => {
	const pack = tar.pack();
	const gzip = zlib.createGzip();
	const onAllFilesRead = nthback(Object.keys(files).length);
	const onReadFile = onAllFilesRead(() => {
		pack.finalize();
	});

	for(const filename in files) {
		const name = path.join(prefix, filename);
		const file = files[filename];
		if(isStream.readable(file)) {
			if(file.length) {
				file.pipe(pack.entry({name, size: file.length}, onReadFile));
			} else if(file.path) {
				fs.stat(file.path, (err, stat) => {
					if(err) return pack.emit('error', err);
					file.pipe(pack.entry({name, size: stat.size}, onReadFile));
				});
			} else {
				throw new Error(`${filename} is a stream but has no length or path property, so we can't find out what size it is`);
			}
		} else if(typeof file === 'string' || Buffer.isBuffer(file)) {
			pack.entry({name}, file, onReadFile);
		} else {
			pack.entry({name}, JSON.stringify(file), onReadFile);
		}
	}

	return pack.pipe(gzip);
};
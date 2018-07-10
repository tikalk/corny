const { spawn, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const kill = require('tree-kill');

const electronExecutable = path.resolve(__dirname, '../node_modules/.bin/electron');
const electronCode = path.resolve(__dirname, '../electron/main.js');

const OUTFILE = path.resolve(__dirname, 'temp.jpg');

let subprocess;

const init = () => {
	if (subprocess) {
		return;
	}

	subprocess = spawn(electronExecutable, [electronCode], {
		env: Object.assign({}, process.env, {
			OUTFILE,
			ELECTRON_RUN_AS_NODE: '',
		}),
	});
	console.log(`Spawned electron ${subprocess.pid}`);
};

const shutdown = () => {
	if (subprocess) {
		kill(subprocess.pid, 'SIGKILL');
		subprocess = undefined;
	}
};

const capture = () => OUTFILE;

process.on('exit', shutdown);

module.exports = {
	init,
	capture,
	shutdown,
};

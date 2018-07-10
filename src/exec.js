const vscode = require('vscode');
var { spawn } = require('child_process');
const output = vscode.window.createOutputChannel('Corny');

const print = data => output.append(data.toString());

let process;

const getRootDirectory = () => {
	const { workspaceFolders } = vscode.workspace;
	return (workspaceFolders && workspaceFolders[0] && workspaceFolders[0].uri.fsPath) || '.';
};

const run = (command, ...args) => {
	return new Promise(resolve => {
		if (process) {
			// Kill any remaining processes from last time
			try {
				process.kill();
			} catch (e) {
				// Ignore
			}
		}

		process = spawn(command, args, { cwd: getRootDirectory() });
		process.stdout.on('data', print);
		process.stderr.on('data', print);

		process.on('close', status => {
			resolve(status);
			process = null;
		});
	});
};

module.exports = async (command, ...args) => {
	if (!command) {
		return;
	}

	const fullCommand = `${command} ${args.join(' ')}`;
	vscode.window.showInformationMessage(fullCommand);

	output.clear();
	output.appendLine(`$ ${fullCommand}`);

	const status = await run(command, ...args);
	output.appendLine(`Command ${command} exited with status code ${status}`);
};

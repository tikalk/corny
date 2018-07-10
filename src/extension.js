const vscode = require('vscode');

const exec = require('./exec');
const throttle = require('./throttle');
const webcam = require('./webcam');

let interval;

const register = (context, name, handler) => {
	const disposable = vscode.commands.registerCommand(name, handler);
	context.subscriptions.push(disposable);
};

const processWebcam = () => {
	const buffer = webcam.capture();
	// console.log(buffer);
	// TODO
};

module.exports = {
	activate: context => {
		console.log('Corny initialized');

		register(context, 'corny.sayHello', () => {
			vscode.window.showInformationMessage('Hello World!');
		});

		register(context, 'corny.gitPull', () => {
			throttle(() => exec('git', 'pull'));
		});

		register(context, 'corny.gitPush', () => {
			throttle(() => exec('git', 'push'));
		});

		webcam.init();
		interval = setInterval(processWebcam, 500);
	},

	deactivate: () => {
		webcam.shutdown();
		clearInterval(interval);
	},
};

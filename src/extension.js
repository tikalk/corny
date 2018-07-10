const vscode = require('vscode');

const exec = require('./exec');
const throttle = require('./throttle');

const register = (context, name, handler) => {
	const disposable = vscode.commands.registerCommand(name, handler);
	context.subscriptions.push(disposable);
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
	},

	deactivate: () => {},
};

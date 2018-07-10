const vscode = require('vscode');

const exec = require('./exec');

const register = (context, name, handler) => {
	const disposable = vscode.commands.registerCommand(name, handler);
	context.subscriptions.push(disposable);
};

module.exports = {
	activate: context => {
		register(context, 'extension.sayHello', () => {
			vscode.window.showInformationMessage('Hello World!');
		});

		register(context, 'extension.gitPull', () => {
			exec('git', 'pull');
		});

		register(context, 'extension.gitPsh', () => {
			exec('git', 'push');
		});
	},

	deactivate: () => {},
};

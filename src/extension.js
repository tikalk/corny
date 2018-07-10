const vscode = require('vscode');

const register = (name, handler) => {
	const disposable = vscode.commands.registerCommand(name, handler);
	context.subscriptions.push(disposable);
};

module.exports = {
	activate: context => {
		register('extension.sayHello', () => {
			vscode.window.showInformationMessage('Hello World!');
		});
		register('extension.gitPull', () => {
			vscode.window;
		});
	},

	deactivate: () => {},
};

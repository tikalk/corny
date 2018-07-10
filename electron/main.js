const { app, BrowserWindow } = require('electron');

app.on('ready', function() {
	const mainWindow = new BrowserWindow({
		width: 1280,
		height: 720,
		frame: false,
		resizable: false,
		alwaysOnTop: false,
	});

	mainWindow.loadFile(require.resolve('./index.html'));
	mainWindow.openDevTools();
});

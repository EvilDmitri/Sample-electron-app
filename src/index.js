'use strict';
const electron = require('electron');
const fs = require("fs");
const ipc = require('electron').ipcMain;

const app = electron.app;

// Capture command line argument
let argsCmd = process.argv.slice(2);
let timerTime = parseInt(argsCmd[0]);


// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;
let insertWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array

	mainWindow = null;
	app.quit();

}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 1024,
		height: 768,
        // frame: false,
        // resizable: false
	});

	win.loadURL(`file://${__dirname}/../windows/main/main.html`);
	win.openDevTools();
	win.on('closed', onClosed);

	// When UI has finish loading
    win.webContents.on('did-finish-load', () => {
        // Send the timer value

        win.webContents.send('timer-change', timerTime);
    });

	return win;
}


function createInsertWindow () {
	insertWindow = new electron.BrowserWindow({
		width: 640,
		height: 480,
		show: false
	});

	insertWindow.loadURL(`file://${__dirname}/../windows/insert/insert.html`);

	insertWindow.on('closed', function() {
		insertWindow = null;
	});
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {

	mainWindow = createMainWindow();


});



// ipc.on('toggle-insert-view', function() {
//
// 	if(!insertWindow) {
// 		createInsertWindow();
// 	}
//
// 	return (insertWindow.isVisible()) ? insertWindow.hide() : insertWindow.show();
// });


ipc.on('get-page', function(event, args) {

	console.log(args[0]);

	const http = require('http');

	let options = {
	    host: 'sockslist.net',
		path: '/proxy/server-socks-hide-ip-address/1#proxylist'
	};
	let request = http.request(options, function (res) {
	    let data = '';
	    res.on('data', function (chunk) {
	        data += chunk;
	    });
	    res.on('end', function () {
	    	fs.writeFile('file.html', data, 'utf8');
	        console.log(data);
	    });
	});
	request.on('error', function (e) {
	    console.log(e.message);
	});
	request.end();


	function nospy (str, fakechar) {
		var re = new RegExp(fakechar ,"g");
		return str.replace(re, "");
	}
});

'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keeping a global reference of the window object so it doesn't get automatically
// closed when the Javascript object is garbage collected.
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    // Open dev tools.
    mainWindow.webContents.openDevTools();

    // Emitted when then window is closed.
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Called when electron init is done.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS-X its common for application and their menu bar to stay active
    // until user quits explicitly with cmd+q.
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    // On OS-X its common to re-create a window in the app when the dock icon
    // is clicked and there are no other windows open.
    if (mainWindow === null) createWindow();
});

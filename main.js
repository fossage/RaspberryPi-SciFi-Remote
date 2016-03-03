'use strict';

const os = require('os');
const electron = require('electron');
const app = electron.app;
// Module to control application life.

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const ipcMain = electron.ipcMain;
const dialog = require('electron').dialog;
let pi = os.arch() === 'arm';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
 
  let size = electron.screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({ 
    width: pi ? size.width : 700,
    height: pi? size.heigth : 400, 
    icon: './img/sloth.jpg',
    skipTaskbar: true,
    autoHideMenuBar: true,
    type: 'splash',
    backgroundColor: '#BDF4DE'
  });

  if(pi) {
    let gpio = require('rpi-gpio');
    
    gpio.setup(15, gpio.DIR_OUT, write(15));
    gpio.setup(11, gpio.DIR_OUT, write(11));
    

    function write(pin) {
      return () => {
        gpio.write(pin, true, function(err){
          if(err) throw err;
          console.log('Pin 13');
        });
      }
    }
  }


  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/public/index.html');

  if(pi) {
    mainWindow.setFullScreen(true);
    mainWindow.webContents.openDevTools(); 
  }
 
  
  
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    if(pi){
      gpio.destroy();
    }
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

ipcMain.on('online-status-changed', function(event, status) {
  console.log(status);
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

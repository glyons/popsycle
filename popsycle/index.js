const TrayWindow = require("C:\\Electron\\electron-tray-window");

//https://www.npmjs.com/package/keyboard-layout
//const KeyboardLayout = require('keyboard-layout')
//let subscription = null
const {app, ipcMain, Tray, BrowserWindow, globalShortcut,  desktopCapturer } = require("electron");
const electron = require('electron');

const path = require("path");

app.whenReady().then(() => {
  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register('CommandOrControl+Shift+K', () => {
    console.log('CommandOrControl+Shift+K is pressed')

    TrayWindow.toggleWindow()




  })

  if (!ret) {
    console.log('registration failed')
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('CommandOrControl+Shift+K'))
})

app.on("ready", () => {
  //subscription = KeyboardLayout.observeCurrentKeyboardLayout((layout) => console.log(layout))
  var electronScreen = electron.screen;
  var size = electronScreen.getPrimaryDisplay().workAreaSize;

  TrayWindow.setOptions({
    trayIconPath: path.join("resources/icon.png"),
    windowUrl: `file://${path.join(__dirname, "resources/index.html")}`,
    width: size.width,
    height: size.height 
  });
});


app.on('will-quit', () => {
  // Unregister a shortcut.
  globalShortcut.unregister('CommandOrControl+Shift+K')

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()

 // subscription.dispose()
})


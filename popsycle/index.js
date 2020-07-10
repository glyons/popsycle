const TrayWindow = require("../electron-tray-window/src");
const activeWin = require('active-win');
//https://www.npmjs.com/package/keyboard-layout
//const KeyboardLayout = require('keyboard-layout')
//let subscription = null
const {app, ipcMain, Tray, BrowserWindow, globalShortcut,  desktopCapturer } = require("electron");
const electron = require('electron');

const path = require("path");

app.whenReady().then(() => {
  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register('CommandOrControl+Shift+K', () => {
    console.log('CommandOrControl+Shift+K is pressed');
    (async () => {
      console.log(await activeWin());
      /*
      {
          title: 'Unicorns - Google Search',
          id: 5762,
          bounds: {
              x: 0,
              y: 0,
              height: 900,
              width: 1440
          },
          owner: {
              name: 'Google Chrome',
              processId: 310,
              bundleId: 'com.google.Chrome',
              path: '/Applications/Google Chrome.app'
          },
          url: 'https://sindresorhus.com/unicorn',
          memoryUsage: 11015432
      }
      */
    })();
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



ipcMain.on('tray-window-moved', (e, a) => {
  console.log(e.window.getPosition())
  TrayWindow.setWindow(e.window)
});

ipcMain.on("tray-window-ready", (e, a) => {
  console.log("tray window is ready");
  //console.log(e.window)
  //console.log(e.tray)
});

ipcMain.on("tray-window-clicked", (e, a) => {
  console.log("clicked the tray icon");
  //console.log(e.window)
  //console.log(e.tray)

  
});

ipcMain.on("tray-window-visible", (e, a) => {
  console.log("tray window is visible now");
  //console.log(e.window)
  //console.log(e.tray)

});

ipcMain.on("tray-window-hidden", (e, a) => {
  console.log("tray window is hidden now");
  //console.log(e.window)
  //console.log(e.tray)
});


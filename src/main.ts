import { app, BrowserWindow, screen } from "electron";
import { MenuBuilder } from "./menu";
import { MyAppMain } from "./app/MyAppMain";
import { MyAppInfo } from "./app/MyAppInfo";

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

MyAppMain.initLogger();

console.log('👋 This message is being logged by "main.ts"');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  // https://www.electronjs.org/docs/latest/api/screen
  const primaryDisplay = screen.getPrimaryDisplay();
  const size: Electron.Size = primaryDisplay.workAreaSize;

  // https://stackoverflow.com/questions/59385237/electron-window-dimensions-vs-screen-resolution
  // Retina displays have a different pixel scale factor, and that Electron uses that in its calculations...
  let factor = primaryDisplay.scaleFactor;

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: size.width / factor,
    height: size.height / factor,
    icon: "/assets/app-icons/icon.png",
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      zoomFactor: 1.0 / factor,
    },
  });

  const menuBuilder = new MenuBuilder(
    mainWindow,
    MyAppInfo.MY_APP_NAME,
    MyAppInfo.HELP_LINKS_DEV,
    MyAppInfo.HELP_LINKS_PROD
  );
  menuBuilder.buildMenu();

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools for development per default.
  if (
    process.env.NODE_ENV === "development" ||
    process.env.DEBUG_PROD === "true"
  ) {
    mainWindow.webContents.openDevTools();
  }
};

async function register_IPC_Listeners() {
  MyAppMain.getAppBackend().handle_IPC();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app
  .on("ready", createWindow)
  .whenReady()
  .then(register_IPC_Listeners)
  .catch((e) => console.error(e));

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

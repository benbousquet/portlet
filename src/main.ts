import { exec, spawn } from "child_process";
import { app, BrowserWindow, ipcMain } from "electron";
import { writeFile } from "fs/promises";
import path from "path";
import { file, fileSync } from "tmp";

const VPNGATE_API = "http://www.vpngate.net/api/iphone/";
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.handle("get-server-list-text", async () => {
    const res = await fetch(VPNGATE_API);
    const serverListText = await res.text();
    return serverListText;
  });

  ipcMain.on("connect-to-openvpn-server", (event, openVPNConfigData) => {
    file(
      { mode: 0o644, postfix: ".ovpn" },
      async function _tempFileCreated(err, path, fd) {
        if (err) throw err;
        let decoded = Buffer.from(openVPNConfigData, "base64").toString(
          "ascii"
        );
        decoded = decoded.replaceAll("cipher AES-128-CBC", "--data-ciphers AES-128-CBC")
        // console.log(decoded)
        await writeFile(path, decoded);
        const openVPNProcess = exec(`sudo openvpn --config ${path}`);
        openVPNProcess.stdout.on("data", function (data) {
          console.log("stdout: " + data);
        });
        openVPNProcess.stderr.on("data", function (data) {
          console.log("stdout: " + data);
        });
        openVPNProcess.on("close", function (code) {
          console.log("closing code: " + code);
        });
      }
    );
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

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

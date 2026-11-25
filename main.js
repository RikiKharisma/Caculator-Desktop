
const { app, BrowserWindow } = require("electron");

function createWindow() {

    const win = new BrowserWindow({

        width: 380,
        height: 620,

        minWidth: 320,
        minHeight: 480,

        resizable: true,

        autoHideMenuBar: true,

        title: "Calculator Desktop",

        backgroundColor: "#202020",

        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false
        }

    });

    win.loadFile("index.html");

}

app.whenReady().then(() => {

    createWindow();

    app.on("activate", () => {

        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }

    });

});

app.on("window-all-closed", () => {

    if (process.platform !== "darwin") {
        app.quit();
    }

});

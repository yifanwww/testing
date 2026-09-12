const { app, BrowserWindow } = require('electron');
const path = require('node:path');

app.whenReady().then(async () => {
  const window = new BrowserWindow({
    webPreferences: {
      additionalArguments: ['--verbose', 'ARG'],
      preload: path.join(app.getAppPath(), 'out/preload/index.js'),
    },
  });

  if (process.env.ELECTRON_RENDERER_URL) {
    await window.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    await window.loadFile(path.join(app.getAppPath(), 'out/renderer/index.html'));
  }

  window.show();
});

const { app } = require('electron');
const { spawn } = require('node:child_process');
const path = require('node:path');

const childEntry = path.join(app.getAppPath().replace('app.asar', 'app.asar.unpacked'), 'child.js');

app.whenReady().then(() => {
  const child = spawn(process.execPath, [childEntry, '--verbose', 'ARG'], {
    env: {
      ...process.env,
      ELECTRON_RUN_AS_NODE: '1',
    },
    stdio: 'inherit',
  });
  child.once('exit', () => app.quit());
});

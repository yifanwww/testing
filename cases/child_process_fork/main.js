const { app } = require('electron');
const { fork } = require('node:child_process');
const path = require('node:path');

const childEntry = path.join(app.getAppPath().replace('app.asar', 'app.asar.unpacked'), 'child.js');

app.whenReady().then(() => {
  const child = fork(childEntry, ['--verbose', 'ARG'], { stdio: 'inherit' });
  child.once('exit', () => app.quit());
});

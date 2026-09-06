const { app, utilityProcess } = require('electron');
const path = require('node:path');

const childEntry = path.join(app.getAppPath().replace('app.asar', 'app.asar.unpacked'), 'child.js');

app.whenReady().then(() => {
  const child = utilityProcess.fork(childEntry, ['--verbose'], { stdio: 'inherit' });
  child.once('exit', () => app.quit());
});

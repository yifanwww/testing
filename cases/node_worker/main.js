const { app } = require('electron');
const { Worker } = require('node:worker_threads');
const path = require('node:path');

const childEntry = path.join(app.getAppPath().replace('app.asar', 'app.asar.unpacked'), 'child.js');

app.whenReady().then(() => {
  const worker = new Worker(childEntry, { argv: ['--verbose', 'ARG'] });
  worker.once('exit', () => app.quit());
});

const { Command } = require('commander');
const { app } = require('electron');

app.whenReady().then(() => {
  const program = new Command().argument('[input...]').option('--verbose');

  console.log({
    'process.argv': process.argv,
    'process.versions.electron': process.versions.electron,
    'process.defaultApp': process.defaultApp,
    'process.type': process.type,
    'process.env.ELECTRON_RUN_AS_NODE': process.env.ELECTRON_RUN_AS_NODE,
  });

  program.parse();

  console.log({ args: program.args, options: program.opts() });

  app.quit();
});

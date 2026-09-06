const { Command } = require('commander');

console.log({
  'process.argv': process.argv,
  'process.versions.electron': process.versions.electron,
  'process.defaultApp': process.defaultApp,
  'process.type': process.type,
  'process.env.ELECTRON_RUN_AS_NODE': process.env.ELECTRON_RUN_AS_NODE,
});

const program = new Command().argument('[input]').option('--verbose');

program.parse();

console.log({ args: program.args, options: program.opts() });

process.exit(0);

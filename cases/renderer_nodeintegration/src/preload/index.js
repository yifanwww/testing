import { Command } from 'commander';
import { contextBridge } from 'electron';

const program = new Command().argument('[input...]').option('--verbose').allowUnknownOption();

program.parse();

contextBridge.exposeInMainWorld('processInfo', {
  'process.argv': process.argv,
  'process.versions.electron': process.versions.electron,
  'process.defaultApp': process.defaultApp,
  'process.type': process.type,
  'process.env.ELECTRON_RUN_AS_NODE': process.env.ELECTRON_RUN_AS_NODE,
});
contextBridge.exposeInMainWorld('commander', { args: program.args, options: program.opts() });

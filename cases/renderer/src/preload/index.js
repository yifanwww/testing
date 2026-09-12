import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('processInfo', {
  'process.argv': process.argv,
  'process.versions.electron': process.versions.electron,
  'process.defaultApp': process.defaultApp,
  'process.type': process.type,
  'process.env.ELECTRON_RUN_AS_NODE': process.env.ELECTRON_RUN_AS_NODE,
});

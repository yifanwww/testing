# Testing

For issue: https://github.com/tj/commander.js/issues/2603

The test code is in `cases/` folder.

To prepare the testing environment and build the electron apps:

```sh
pnpm install
pnpm run dist:mac  # on macos system
pnpm run dist:win  # on windows system
```

## Summary

There are 2 ways to start an Electron application:

- by Electron executable: `electron . --version ARG`, `electron /path/to/asar --version ARG`
- by app executable: `/path/to/app --version ARG`

| group                             | `process.argv`                                                                          | has electron version? | `process.defaultApp` | `process.type` | run as node |
| :-------------------------------- | :-------------------------------------------------------------------------------------- | :-------------------- | :------------------- | :------------- | :---------- |
| main process, started by electron | `['/path/to/electron', '.', '--verbose', 'ARG']`                                        | yes                   | `true`               | `browser`      | `undefined` |
| main process, started by app      | `['/path/to/<app>', '--verbose', 'ARG']`                                                | yes                   | `undefined`          | `browser`      | `undefined` |
| spawn in run_as_node mode         | `['/path/to/<electron_or_app>', '/path/to/child.js', '--verbose', 'ARG']`               | yes                   | `undefined`          | `undefined`    | `1`         |
| use `child_process.fork`          | `['/path/to/<electron_or_app>', '/path/to/child.js', '--verbose', 'ARG']`               | yes                   | `undefined`          | `undefined`    | `1`         |
| spawn Nodejs child process        | `['/path/to/node', '/path/to/child.js', '--verbose', 'ARG']`                            | no                    | `undefined`          | `undefined`    | `undefined` |
| use `utility_process.fork`        | `['/path/to/<electron_or_app>', '/path/to/child.js', '--verbose', 'ARG']`               | yes                   | `undefined`          | `utility`      | `undefined` |
| use `node:worker_threads`         | `['/path/to/<electron_or_app>', '/path/to/child.js', '--verbose', 'ARG']`               | yes                   | `undefined`          | `undefined`    | `undefined` |
| in renderer process               | `['/path/to/<electron_or_app>', ...<electron opts>, '--verbose', 'ARG', '/prefetch:1']` | yes                   | `undefined`          | `renderer`     | `undefined` |

## Testing Details

### `cases/main`

Checks `process.argv` in Electron main process

Run the unpackaged app using command `electron . --verbose ARG` (`pnpm --filter testing_main run-unpackaged`):

```js
{
  'process.argv': ['/path/to/electron', '.', '--verbose', 'ARG'],
  'process.versions.electron': '43.4.1',
  'process.defaultApp': true,
  'process.type': 'browser',
  'process.env.ELECTRON_RUN_AS_NODE': undefined
}
{ args: [ 'ARG' ], options: { verbose: true } }
```

Use `electron /path/to/app.asar --verbose ARG` to run the packaged app (`pnpm --filter testing_main run-asar`):

```js
{
  'process.argv': ['/path/to/electron', '/path/to/app.asar', '--verbose', 'ARG'],
  'process.versions.electron': '43.4.1',
  'process.defaultApp': true,
  'process.type': 'browser',
  'process.env.ELECTRON_RUN_AS_NODE': undefined
}
{ args: ['ARG'], options: { verbose: true } }
```

Run the packaged app directly (`pnpm --filter testing_main run-app`):

```js
{
  'process.argv': ['/path/to/<app>', '--verbose', 'ARG'],
  'process.versions.electron': '43.4.1',
  'process.defaultApp': undefined,
  'process.type': 'browser',
  'process.env.ELECTRON_RUN_AS_NODE': undefined
}
{ args: ['ARG'], options: { verbose: true } }
```

### `cases/spawn_runasnode`

Checks `process.argv` in child process created by `child_process.spawn` with env var `ELECTRON_RUN_AS_NODE=1`

Run the unpackaged app (`pnpm --filter testing_spawn_runasnode run-unpackaged`):

```js
{
  'process.argv': ['/path/to/electron', '/path/to/child.js', '--verbose', 'ARG'],
  'process.versions.electron': '43.4.1',
  'process.defaultApp': undefined,
  'process.type': undefined,
  'process.env.ELECTRON_RUN_AS_NODE': '1'
}
{
  args: ['/path/to/child.js', 'ARG'],
  options: { verbose: true }
}
```

Run the packaged app directly (`pnpm --filter testing_spawn_runasnode run-app`):

```js
{
  'process.argv': ['/path/to/<app>', '/path/to/child.js', '--verbose', 'ARG'],
  'process.versions.electron': '43.4.1',
  'process.defaultApp': undefined,
  'process.type': undefined,
  'process.env.ELECTRON_RUN_AS_NODE': '1'
}
{
  args: ['/path/to/child.js', 'ARG'],
  options: { verbose: true }
}
```

### `cases/spawn_node`

Checks `process.argv` in child process created by `child_process.spawn` using Node.js

Run the unpackaged app (`pnpm --filter testing_spawn_node run-unpackaged`):

```js
{
  'process.argv': ['/path/to/node', '/path/to/child.js', '--verbose', 'ARG'],
  'process.versions.electron': undefined,
  'process.defaultApp': undefined,
  'process.type': undefined,
  'process.env.ELECTRON_RUN_AS_NODE': undefined
}
{ args: ['ARG'], options: { verbose: true } }
```

Run the packaged app directly (`pnpm --filter testing_spawn_node run-app`):

```js
{
  'process.argv': ['/path/to/node', '/path/to/child.js', '--verbose', 'ARG'],
  'process.versions.electron': undefined,
  'process.defaultApp': undefined,
  'process.type': undefined,
  'process.env.ELECTRON_RUN_AS_NODE': undefined
}
{ args: ['ARG'], options: { verbose: true } }
```

### `cases/child_process_fork`

Checks `process.argv` in child process created by `child_process.fork`

According to [Electron Fuses #runAsNode](#https://www.electronjs.org/docs/latest/tutorial/fuses#runasnode), `child_process.fork` depends on environment variable `ELECTRON_RUN_AS_NODE` (it internally sets the env var to the child process).

Run the unpackaged app (`pnpm --filter testing_child_process_fork run-unpackaged`):

```js
{
  'process.argv': ['/path/to/electron', '/path/to/child.js', '--verbose', 'ARG'],
  'process.versions.electron': '43.4.1',
  'process.defaultApp': undefined,
  'process.type': undefined,
  'process.env.ELECTRON_RUN_AS_NODE': '1'
}
{
  args: ['/path/to/child.js', 'ARG'],
  options: { verbose: true }
}
```

Run the packaged app directly (`pnpm --filter testing_child_process_fork run-app`):

```js
{
  'process.argv': ['/path/to/<app>', '/path/to/child.js', '--verbose', 'ARG'],
  'process.versions.electron': '43.4.1',
  'process.defaultApp': undefined,
  'process.type': undefined,
  'process.env.ELECTRON_RUN_AS_NODE': '1'
}
{
  args: ['/path/to/child.js', 'ARG'],
  options: { verbose: true }
}
```

### `cases/utility_process_fork`

Checks `process.argv` in child process created by `utility_process.fork`

Run the unpackaged app (`pnpm --filter testing_utility_process_fork run-unpackaged`):

```js
{
  'process.argv': ['/path/to/electron', '/path/to/child.js', '--verbose', 'ARG'],
  'process.versions.electron': '43.4.1',
  'process.defaultApp': undefined,
  'process.type': 'utility',
  'process.env.ELECTRON_RUN_AS_NODE': undefined
}
{
  args: ['/path/to/child.js', 'ARG'],
  options: { verbose: true }
}
```

Run the packaged app directly (`pnpm --filter testing_utility_process_fork run-app`):

```js
{
  'process.argv': ['/path/to/<app>', '/path/to/child.js', '--verbose', 'ARG'],
  'process.versions.electron': '43.4.1',
  'process.defaultApp': undefined,
  'process.type': 'utility',
  'process.env.ELECTRON_RUN_AS_NODE': undefined
}
{
  args: ['/path/to/child.js', 'ARG'],
  options: { verbose: true }
}
```

### `cases/node_worker`

Checks `process.argv` in child process created by Node.js `worker_threads` API

Run the unpackaged app (`pnpm --filter testing_node_worker run-unpackaged`):

```js
{
  'process.argv': ['/path/to/electron', '/path/to/child.js', '--verbose', 'ARG'],
  'process.versions.electron': '43.4.1',
  'process.defaultApp': undefined,
  'process.type': undefined,
  'process.env.ELECTRON_RUN_AS_NODE': undefined
}
{
  args: ['/path/to/child.js', 'ARG'],
  options: { verbose: true }
}
```

Run the packaged app directly (`pnpm --filter testing_node_worker run-app`):

```js
{
  'process.argv': ['/path/to/<app>', '/path/to/child.js', '--verbose', 'ARG'],
  'process.versions.electron': '43.4.1',
  'process.defaultApp': undefined,
  'process.type': undefined,
  'process.env.ELECTRON_RUN_AS_NODE': undefined
}
{
  args: ['/path/to/child.js', 'ARG'],
  options: { verbose: true }
}
```

### `cases/renderer`

Checks `process.argv` in the renderer process (context isolated and sandboxed)

`commander` cannot work because `node:child_process` module is missing.

However the process information is similar to that in `cases/renderer_nodeintegration` case:

```json
{
  "process.argv": [
    "/path/to/electron",
    "--type=renderer",
    "--user-data-dir=<user-app-dir>",
    "--app-path=<app-path>",
    "--enable-sandbox",
    "--video-capture-use-gpu-memory-buffer",
    "--lang=en-US",
    "--device-scale-factor=1.5",
    "--num-raster-threads=<number>",
    "--enable-main-frame-before-activation",
    "--renderer-client-id=<number>",
    "--time-ticks-at-unix-epoch=<number>",
    "--launch-time-ticks=<number>",
    "--field-trial-handle=<multi-number>",
    "--enable-features=<feature>",
    "--disable-features=<feature-list>",
    "--variations-seed-version",
    "--pseudonymization-salt-handle=<multi-number>",
    "--trace-process-track-uuid=<number>",
    "--mojo-platform-channel-handle=<number>",
    "--verbose",
    "/prefetch:1",
    "ARG"
  ],
  "process.versions.electron": "43.4.1",
  "process.type": "renderer"
}
```

### `cases/renderer_nodeintegration`

Checks `process.argv` in the renderer process (context isolated but with node integration)

1. Run the unpackaged app

```sh
pnpm --filter testing_renderer_nodeintegration dev
```

Result:

```json
{
  "process.argv": [
    "/path/to/electron",
    "--type=renderer",
    "--user-data-dir=<user-data-dir>",
    "--app-path=<app-path>",
    "--no-sandbox",
    "--no-zygote",
    "--video-capture-use-gpu-memory-buffer",
    "--lang=en-US",
    "--device-scale-factor=1.5",
    "--num-raster-threads=<number>",
    "--enable-main-frame-before-activation",
    "--renderer-client-id=<number>",
    "--time-ticks-at-unix-epoch=<number>",
    "--launch-time-ticks=<number>",
    "--field-trial-handle=<multi-numbers>",
    "--enable-features=<feature>",
    "--disable-features=<feature-list>",
    "--variations-seed-version",
    "--pseudonymization-salt-handle=<multi-numbers>",
    "--trace-process-track-uuid=<number>",
    "--mojo-platform-channel-handle=<number>",
    "--verbose",
    "ARG",
    "/prefetch:1"
  ],
  "process.versions.electron": "43.4.1",
  "process.type": "renderer"
}
{
  "args": [
    "--type=renderer",
    "--user-data-dir=<user-data-dir>",
    "--app-path=<app-path>",
    "--no-sandbox",
    "--no-zygote",
    "--video-capture-use-gpu-memory-buffer",
    "--lang=en-US",
    "--device-scale-factor=1.5",
    "--num-raster-threads=<number>",
    "--enable-main-frame-before-activation",
    "--renderer-client-id=<number>",
    "--time-ticks-at-unix-epoch=<number>",
    "--launch-time-ticks=<number>",
    "--field-trial-handle=<multi-numbers>",
    "--enable-features=<feature>",
    "--disable-features=<feature-list>",
    "--variations-seed-version",
    "--pseudonymization-salt-handle=<multi-numbers>",
    "--trace-process-track-uuid=<number>",
    "--mojo-platform-channel-handle=<number>",
    "ARG",
    "/prefetch:1"
  ],
  "options": {
    "verbose": true
  }
}
```

2. Run the packaged app directly

```sh
pnpm --filter testing_renderer_nodeintegration dist:mac  # or dist:win
pnpm --filter testing_renderer_nodeintegration run-app
```

Result:

```json
{
  "process.argv": [
    "/path/to/<app>",
    "--type=renderer",
    "--user-data-dir=<user-data-dir>",
    "--app-path=<app-path>",
    "--no-sandbox",
    "--no-zygote",
    "--video-capture-use-gpu-memory-buffer",
    "--lang=en-US",
    "--device-scale-factor=1.5",
    "--num-raster-threads=<number>",
    "--enable-main-frame-before-activation",
    "--renderer-client-id=<number>",
    "--time-ticks-at-unix-epoch=<number>",
    "--launch-time-ticks=<number>",
    "--field-trial-handle=<multi-numbers>",
    "--enable-features=<feature>",
    "--disable-features=<feature-list>",
    "--variations-seed-version",
    "--pseudonymization-salt-handle=<multi-numbers>",
    "--trace-process-track-uuid=<number>",
    "--mojo-platform-channel-handle=<number>",
    "--verbose",
    "ARG",
    "/prefetch:1"
  ],
  "process.versions.electron": "43.4.1",
  "process.type": "renderer"
}
{
  "args": [
    "--type=renderer",
    "--user-data-dir=<user-data-dir>",
    "--app-path=<app-path>",
    "--no-sandbox",
    "--no-zygote",
    "--video-capture-use-gpu-memory-buffer",
    "--lang=en-US",
    "--device-scale-factor=1.5",
    "--num-raster-threads=<number>",
    "--enable-main-frame-before-activation",
    "--renderer-client-id=<number>",
    "--time-ticks-at-unix-epoch=<number>",
    "--launch-time-ticks=<number>",
    "--field-trial-handle=<multi-numbers>",
    "--enable-features=<feature>",
    "--disable-features=<feature-list>",
    "--variations-seed-version",
    "--pseudonymization-salt-handle=<multi-numbers>",
    "--trace-process-track-uuid=<number>",
    "--mojo-platform-channel-handle=<number>",
    "ARG",
    "/prefetch:1"
  ],
  "options": {
    "verbose": true
  }
}
```

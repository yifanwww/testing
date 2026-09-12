# Testing

For issue: https://github.com/tj/commander.js/issues/2603

## Testing Cases

The test code is in `cases/` folder.

To prepare the testing environment and build the electron apps:

```sh
pnpm install
pnpm run dist:mac  # on macos system
pnpm run dist:win  # on windows system
```

The following is a summary of the results.

### `cases/main`

Checks `process.argv` in Electron main process

Run the unpackaged app using command `electron . --verbose ARG` (`pnpm --filter main run-unpackaged`):

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

Use `electron /path/to/app.asar --verbose ARG` to run the packaged app (`pnpm --filter main run-asar`):

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

Run the packaged app directly (`pnpm --filter main run-app`):

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

Run the unpackaged app (`pnpm --filter spawn_runasnode run-unpackaged`):

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

Run the packaged app directly (`pnpm --filter spawn_runasnode run-app`):

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

Run the unpackaged app (`pnpm --filter spawn_node run-unpackaged`):

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

Run the packaged app directly (`pnpm --filter spawn_node run-app`):

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

Run the unpackaged app (`pnpm --filter child_process_fork run-unpackaged`):

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

Run the packaged app directly (`pnpm --filter child_process_fork run-app`):

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

Run the unpackaged app (`pnpm --filter utility_process_fork run-unpackaged`):

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

Run the packaged app directly (`pnpm --filter utility_process_fork run-app`):

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

Run the unpackaged app (`pnpm --filter node_worker run-unpackaged`):

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

Run the packaged app directly (`pnpm --filter node_worker run-app`):

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

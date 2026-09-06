# Testing

For issue: https://github.com/tj/commander.js/issues/2603

## Testing Cases

### `main`

Checks `process.argv` in Electron main process

Run the unpackaged app using command `electron . --verbose`:

```js
{
  'process.argv': ['/path/to/electron', '.', '--verbose'],
  'process.versions.electron': '43.4.1',
  'process.defaultApp': true,
  'process.type': 'browser',
  'process.env.ELECTRON_RUN_AS_NODE': undefined
}
{ args: [], options: { verbose: true } }
```

Use `electron /path/to/app.asar` to run the packaged app:

```js
{
  'process.argv': ['/path/to/electron', '/path/to/app.asar', '--verbose'],
  'process.versions.electron': '43.4.1',
  'process.defaultApp': true,
  'process.type': 'browser',
  'process.env.ELECTRON_RUN_AS_NODE': undefined
}
{ args: [], options: { verbose: true } }
```

Run the packaged app directly:

```js
{
  'process.argv': ['/path/to/<app>', '--verbose'],
  'process.versions.electron': '43.4.1',
  'process.defaultApp': undefined,
  'process.type': 'browser',
  'process.env.ELECTRON_RUN_AS_NODE': undefined
}
{ args: [], options: { verbose: true } }
```

### `spawn_runasnode`

Checks `process.argv` in child process created by `child_process.spawn` with env var `ELECTRON_RUN_AS_NODE=1`

Run the unpackaged app using command `electron .`:

```js
{
  'process.argv': ['/path/to/electron', '/path/to/child.js', '--verbose'],
  'process.versions.electron': '43.4.1',
  'process.defaultApp': undefined,
  'process.type': undefined,
  'process.env.ELECTRON_RUN_AS_NODE': '1'
}
{
  args: ['/path/to/child.js'],
  options: { verbose: true }
}
```

Run the packaged app directly:

```js
{
  'process.argv': ['/path/to/<app>', '/path/to/child.js', '--verbose'],
  'process.versions.electron': '43.4.1',
  'process.defaultApp': undefined,
  'process.type': undefined,
  'process.env.ELECTRON_RUN_AS_NODE': '1'
}
{
  args: ['/path/to/child.js'],
  options: { verbose: true }
}
```

### `spawn_node`

Checks `process.argv` in child process created by `child_process.spawn` using Node.js

Run the unpackaged app using command `electron .`:

```js
{
  'process.argv': ['/path/to/node', '/path/to/child.js', '--verbose'],
  'process.versions.electron': undefined,
  'process.defaultApp': undefined,
  'process.type': undefined,
  'process.env.ELECTRON_RUN_AS_NODE': undefined
}
{ args: [], options: { verbose: true } }
```

Run the packaged app directly:

```js
{
  'process.argv': ['/path/to/node', '/path/to/child.js', '--verbose'],
  'process.versions.electron': undefined,
  'process.defaultApp': undefined,
  'process.type': undefined,
  'process.env.ELECTRON_RUN_AS_NODE': undefined
}
{ args: [], options: { verbose: true } }
```

### `child_process_fork`

Checks `process.argv` in child process created by `child_process.fork`

Run the unpackaged app using command `electron .`:

```js
{
  'process.argv': ['/path/to/electron', '/path/to/child.js', '--verbose'],
  'process.versions.electron': '43.4.1',
  'process.defaultApp': undefined,
  'process.type': undefined,
  'process.env.ELECTRON_RUN_AS_NODE': '1'
}
{
  args: ['/path/to/child.js'],
  options: { verbose: true }
}
```

Run the packaged app directly:

```js
{
  'process.argv': ['/path/to/<app>', '/path/to/child.js', '--verbose'],
  'process.versions.electron': '43.4.1',
  'process.defaultApp': undefined,
  'process.type': undefined,
  'process.env.ELECTRON_RUN_AS_NODE': '1'
}
{
  args: ['/path/to/child.js'],
  options: { verbose: true }
}
```

### `utility_process_fork`

Checks `process.argv` in child process created by `utility_process.fork`

Run the unpackaged app using command `electron .`:

```js
{
  'process.argv': ['/path/to/electron', '/path/to/child.js', '--verbose'],
  'process.versions.electron': '43.4.1',
  'process.defaultApp': undefined,
  'process.type': 'utility',
  'process.env.ELECTRON_RUN_AS_NODE': undefined
}
{
  args: ['/path/to/child.js'],
  options: { verbose: true }
}
```

Run the packaged app directly:

```js
{
  'process.argv': ['/path/to/<app>', '/path/to/child.js', '--verbose'],
  'process.versions.electron': '43.4.1',
  'process.defaultApp': undefined,
  'process.type': 'utility',
  'process.env.ELECTRON_RUN_AS_NODE': undefined
}
{
  args: ['/path/to/child.js'],
  options: { verbose: true }
}
```

### `node_worker`

Checks `process.argv` in child process created by Node.js `worker_threads` API

Run the unpackaged app using command `electron .`:

```js
{
  'process.argv': ['/path/to/electron', '/path/to/child.js', '--verbose'],
  'process.versions.electron': '43.4.1',
  'process.defaultApp': undefined,
  'process.type': undefined,
  'process.env.ELECTRON_RUN_AS_NODE': undefined
}
{
  args: ['/path/to/child.js'],
  options: { verbose: true }
}
```

Run the packaged app directly:

```js
{
  'process.argv': ['/path/to/<app>', '/path/to/child.js', '--verbose'],
  'process.versions.electron': '43.4.1',
  'process.defaultApp': undefined,
  'process.type': undefined,
  'process.env.ELECTRON_RUN_AS_NODE': undefined
}
{
  args: ['/path/to/child.js'],
  options: { verbose: true }
}
```

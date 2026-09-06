import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

const releaseDir = path.resolve(import.meta.dirname, '..', 'release');

const platform = process.platform;

let executable;
if (platform === 'win32') {
  executable = path.join(releaseDir, 'win-unpacked', 'testing.exe');
} else if (platform === 'darwin') {
  // electron-builder outputs to mac-arm64/ or mac/ depending on architecture
  const macArm = path.join(releaseDir, 'mac-arm64', 'testing.app', 'Contents', 'MacOS', 'testing');
  const macX64 = path.join(releaseDir, 'mac', 'testing.app', 'Contents', 'MacOS', 'testing');
  executable = existsSync(macArm) ? macArm : macX64;
} else {
  console.error(`Unsupported platform: ${platform}`);
  process.exit(1);
}

if (!existsSync(executable)) {
  console.error(`Executable not found: ${executable}`);
  process.exit(1);
}

const child = spawn(executable, ['--verbose'], { stdio: 'inherit' });
child.on('exit', (code) => {
  process.exit(code ?? 0);
});

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import electronBin from 'electron';

const releaseDir = path.resolve(import.meta.dirname, '..', 'release');
const platform = process.platform;

let asarPath;
if (platform === 'win32') {
  asarPath = path.join(releaseDir, 'win-unpacked', 'resources', 'app.asar');
} else if (platform === 'darwin') {
  const macArmAsar = path.join(releaseDir, 'mac-arm64', 'testing.app', 'Contents', 'Resources', 'app.asar');
  const macX64Asar = path.join(releaseDir, 'mac', 'testing.app', 'Contents', 'Resources', 'app.asar');
  asarPath = existsSync(macArmAsar) ? macArmAsar : macX64Asar;
} else {
  console.error(`Unsupported platform: ${platform}`);
  process.exit(1);
}

if (!existsSync(asarPath)) {
  console.error(`Asar not found: ${asarPath}`);
  process.exit(1);
}

execFileSync(electronBin, [asarPath, '--verbose', 'ARG'], { stdio: 'inherit' });

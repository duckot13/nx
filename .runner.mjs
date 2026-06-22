import { execSync } from 'node:child_process';

const dir = process.argv[2];
const cmd = process.argv.slice(3).join(' ');
process.chdir(dir);
try {
  const out = execSync(cmd, {
    stdio: 'pipe',
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 64,
    env: {
      ...process.env,
      NX_NO_CLOUD: 'true',
      NX_DAEMON: 'false',
      CI: 'true',
    },
  });
  process.stdout.write(out);
} catch (e) {
  if (e.stdout) process.stdout.write(e.stdout);
  if (e.stderr) process.stderr.write(e.stderr);
  process.stderr.write(`\n[EXIT CODE ${e.status}]\n`);
  process.exit(e.status || 1);
}

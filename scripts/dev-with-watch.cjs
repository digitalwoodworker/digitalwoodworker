const { spawn } = require('child_process');

const procs = [];
function start(name, cmd, args) {
  console.log(`[dev-with-watch] starting ${name}: ${cmd} ${args.join(' ')}`);
  const p = spawn(cmd, args, { stdio: 'inherit', shell: true });
  p.on('exit', (code, signal) => {
    console.log(`[dev-with-watch] ${name} exited with ${code ?? signal}`);
    // if one process exits, shut down the rest
    procs.forEach((q) => { if (q.pid && q !== p) q.kill(); });
    process.exit(code ?? 0);
  });
  p.on('error', (err) => console.error(`[dev-with-watch] ${name} error:`, err));
  procs.push(p);
}

start('watch-manifest', 'npm', ['run', 'watch-manifest']);
start('dev', 'npm', ['run', 'dev']);

process.on('SIGINT', () => {
  console.log('[dev-with-watch] received SIGINT, killing children');
  procs.forEach((p) => p.kill('SIGINT'));
  process.exit(0);
});

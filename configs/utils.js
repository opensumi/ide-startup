const JSON5 = require('json5');
const { spawnSync } = require('child_process');

/**
 * @param { string } configFile
 * @returns { string }
 */
function resolveTSConfig(configFile) {
  const result = spawnSync('yarn', ['tsc', `-p ${configFile}`, '--showConfig'], {
    cwd: __dirname,
    encoding: 'utf8',
    shell: true,
  });
  const data = result.stdout;
  const lines = data.split('\n');
  const json = JSON5.parse(lines.slice(1).join('\n'));
  return json;
}
exports.resolveTSConfig = resolveTSConfig;

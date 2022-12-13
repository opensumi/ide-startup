import { extProcessInit } from '@opensumi/ide-extension/lib/hosted/ext.process-base.js';

(async () => {
  await extProcessInit({
    builtinCommands: [],
    customVSCodeEngineVersion: '1.67.0',
  });
})();

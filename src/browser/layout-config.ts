import { SlotLocation } from '@opensumi/ide-core-browser/lib/react-providers/slot';
import { defaultConfig } from '@opensumi/ide-main-layout/lib/browser/default-config';

export const layoutConfig = {
  ...defaultConfig,
  ...{
    [SlotLocation.top]: {
      modules: ['menu-bar-container', 'toolbar'],
      // modules: ['@opensumi/ide-menu-bar', 'toolbar'],
    },
  },
};

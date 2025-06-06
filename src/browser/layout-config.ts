import { AI_CHAT_LOGO_AVATAR_ID } from '@opensumi/ide-ai-native/lib/common';
import { SlotLocation } from '@opensumi/ide-core-browser/lib/react-providers/slot';
import { defaultConfig } from '@opensumi/ide-main-layout/lib/browser/default-config';
import { DESIGN_MENU_BAR_RIGHT, DESIGN_MENUBAR_CONTAINER_VIEW_ID } from '@opensumi/ide-design';

export const layoutConfig = {
  ...defaultConfig,
  // [SlotLocation.top]: {
  //   modules: ['menubar', 'toolbar'],
  // },
  [SlotLocation.action]: {
    modules: ['@opensumi/ide-toolbar-action'],
  },

  [DESIGN_MENU_BAR_RIGHT]: {
    modules: [AI_CHAT_LOGO_AVATAR_ID],
  },
  [SlotLocation.top]: {
    modules: [DESIGN_MENUBAR_CONTAINER_VIEW_ID],
  },
};

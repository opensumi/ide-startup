import '@opensumi/ide-i18n/lib/browser';
import { ExpressFileServerModule } from '@opensumi/ide-express-file-server/lib/browser';
import '@opensumi/ide-core-browser/lib/style/index.less';
import '@opensumi/ide-core-browser/lib/style/icon.less';

import { renderApp } from './render-app';
import { AIModules, CommonBrowserModules } from '../../src/browser/common-modules';
import { layoutConfig } from './layout-config';
import './main.less';
import './styles.less';
import { AILayout } from '@opensumi/ide-ai-native/lib/browser/layout/ai-layout';

renderApp({
  modules: [
    ...CommonBrowserModules,
    ...AIModules,
  ],
  layoutConfig,
  layoutComponent: AILayout,
  useCdnIcon: false,
  defaultPreferences: {
    'general.theme': 'opensumi-design-dark-theme',
    'general.icon': 'vscode-icons',
  },
  designLayout: {
    useMenubarView: true,
    useMergeRightWithLeftPanel: true,
  },
  defaultPanels: {
    'bottom': '@opensumi/ide-terminal-next',
    'right': '',
  },
});

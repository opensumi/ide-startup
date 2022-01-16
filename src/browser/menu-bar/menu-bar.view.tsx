import * as React from 'react';
import { MenuBar } from '@opensumi/ide-menu-bar/lib/browser/menu-bar.view';

import * as styles from './menu-bar.module.less';

/**
 * Custom custom menu bar component.
 * Add a custol logo in here, and keep
 * optnsumi's original menubar.
 */
export const MenuBarView = () => (
  <div className={styles.menu_bar_view}>
    <span className={styles.menu_bar_logo} />
    <MenuBar />
  </div>
);

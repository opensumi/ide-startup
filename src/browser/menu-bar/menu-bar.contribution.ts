import { Injectable, Autowired } from '@opensumi/di';
import { ComponentContribution, ComponentRegistry, Domain } from '@opensumi/ide-core-browser';
import { IconService } from '@opensumi/ide-theme/lib/browser';
import { MenuBarView } from './menu-bar.view';

@Injectable()
@Domain(ComponentContribution)
export class MenuBarContribution implements ComponentContribution {

  // Component key
  static MenuBarContainer = 'menu-bar-container';

  @Autowired(IconService)
  private iconService: IconService;
  
  registerComponent(registry: ComponentRegistry): void {
    registry.register(MenuBarContribution.MenuBarContainer, {
      component: MenuBarView,
      id: MenuBarContribution.MenuBarContainer,
    });
  }

}

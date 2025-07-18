import { NodeModule, ConstructorOf } from '@opensumi/ide-core-node';
import { ServerCommonModule } from '@opensumi/ide-core-node';
import { FileServiceModule } from '@opensumi/ide-file-service/lib/node';
import { OpenerModule } from '@opensumi/ide-remote-opener/lib/node';
import { ProcessModule } from '@opensumi/ide-process/lib/node';
import { FileSearchModule } from '@opensumi/ide-file-search/lib/node';
import { SearchModule } from '@opensumi/ide-search/lib/node';
import { TerminalNodePtyModule } from '@opensumi/ide-terminal-next/lib/node';
import { LogServiceModule } from '@opensumi/ide-logs/lib/node';
import { ExtensionModule } from '@opensumi/ide-extension/lib/node';
import { OpenVsxExtensionManagerModule } from '@opensumi/ide-extension-manager/lib/node';
import { FileSchemeNodeModule } from '@opensumi/ide-file-scheme/lib/node';
import { AddonsModule } from '@opensumi/ide-addons/lib/node';
import { AINativeModule } from '@opensumi/ide-ai-native/lib/node';

export const CommonNodeModules: ConstructorOf<NodeModule>[] = [
  ServerCommonModule,
  LogServiceModule,
  FileServiceModule,
  ProcessModule,
  FileSearchModule,
  SearchModule,
  TerminalNodePtyModule,
  ExtensionModule,
  OpenVsxExtensionManagerModule,
  FileSchemeNodeModule,
  AddonsModule,
  OpenerModule,
  AINativeModule,
];

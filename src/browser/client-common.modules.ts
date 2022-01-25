import { Injectable } from '@opensumi/di';
import { BrowserModule, OpenerContribution } from '@opensumi/ide-core-browser';
import { AuthenticationContribution } from '@opensumi/ide-core-browser/lib/authentication/authentication.contribution';
import { ClientCommonContribution } from '@opensumi/ide-core-browser/lib/common/common.contribution';
import { HashCalculateContribution } from '@opensumi/ide-core-browser/lib/hash-calculate/hash-calculate.contribution';
import { DefaultOpenerContribution, OpenerContributionClient } from '@opensumi/ide-core-browser/lib/opener/opener.contribution';
import { RemoteOpenerConverterContribution } from '@opensumi/ide-core-browser/lib/remote-opener';
import { RemoteOpenerConverterContributionClient } from '@opensumi/ide-core-browser/lib/remote-opener/converter.contribution';
import { CommonServerPath, KeytarServicePath, CryptrServicePath } from '@opensumi/ide-core-common';

@Injectable()
export class ClientCommonModule extends BrowserModule {
  contributionProvider = [OpenerContribution, RemoteOpenerConverterContribution];
  providers = [
    ClientCommonContribution,
    DefaultOpenerContribution,
    OpenerContributionClient,
    AuthenticationContribution,
    HashCalculateContribution,
    RemoteOpenerConverterContributionClient,
  ];
  backServices = [
    {
      servicePath: CommonServerPath,
    },
    {
      servicePath: KeytarServicePath,
    },
    {
      servicePath: CryptrServicePath,
    },
  ];
}

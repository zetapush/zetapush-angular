import { NgZone } from '@angular/core';
import { ZetaPushClient, createApi } from 'zetapush-angular';

import { WelcomeApi } from './welcome-api.service';

export function WelcomeApiFactory(client: ZetaPushClient, zone: NgZone): WelcomeApi {
  return createApi<WelcomeApi>(client, zone, WelcomeApi);
}

export const WelcomeApiProvider = {
  provide: WelcomeApi, useFactory: WelcomeApiFactory, deps: [ZetaPushClient, NgZone]
};

import { InjectionToken } from '@angular/core'
import { ClientOptions } from 'zetapush-js'
import { ZetaPushClient, ZetaPushConnection } from './core'

export const ZetaPushClientConfig = new InjectionToken<ClientOptions>(
  'ZetaPushClientConfig',
)

export function ZetaPushClientFactory(config: ClientOptions): ZetaPushClient {
  return new ZetaPushClient(config)
}

export function ZetaPushConnectionFactory(
  client: ZetaPushClient,
): ZetaPushConnection {
  return new ZetaPushConnection(client)
}

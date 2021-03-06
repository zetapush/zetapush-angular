import { Authentication, SmartClient, ClientOptions } from 'zetapush-js';

const ZETAPUSH_DELEGATING_TOKEN_KEY = 'ServicesAuthToken';

export class ZetaPushClient extends SmartClient {}

export class ZetaPushConnection {
  constructor(private client: ZetaPushClient) {}

  get connected() {
    return this.client.isConnected();
  }

  disconnect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const { client } = this;
      const handlers: Array<any> = [];
      if (client.isConnected()) {
        const onConnectionClosed = () => {
          console.trace('ZetaPushConnection::onConnectionClosed');
          // Remove connection status listener
          handlers.forEach((handler) => {
            client.removeConnectionStatusListener(handler);
          });
          // Resolve disconnection
          resolve();
        };
        handlers.push(client.onConnectionClosed(onConnectionClosed));
        // Disconnect client
        client.disconnect();
      } else {
        // Resolve disconnection
        resolve();
      }
    });
  }

  connect(credentials: any = {}): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const { client } = this;
      const handlers: Array<any> = [];
      client.setCredentials(credentials);
      this.disconnect().then(() => {
        const onFailedHandshake = (error: any) => {
          console.trace('ZetaPushConnection::onFailedHandshake', error);
          // Remove connection status listener
          handlers.forEach((handler) => {
            client.removeConnectionStatusListener(handler);
          });
          // Reconnect client via weak auth
          client.connect();
          // Reject connection
          reject();
        };
        const onConnectionEstablished = () => {
          console.trace('ZetaPushConnection::onConnectionEstablished');
          // Remove connection status listener
          handlers.forEach((handler) => {
            client.removeConnectionStatusListener(handler);
          });
          // Resolve connection success
          resolve();
        };
        // Handle connection success and fail
        handlers.push(client.onConnectionEstablished(onConnectionEstablished));
        handlers.push(client.onFailedHandshake(onFailedHandshake));
        // Connect client to ZetaPush backend
        client.connect();
      });
    });
  }
}

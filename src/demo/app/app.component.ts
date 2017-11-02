import { Component } from '@angular/core';

import { ZetaPushConnection, VERSION } from 'zetapush-angular';
import { WelcomeApi } from './welcome-api.service';

@Component({
  selector: 'demo-app',
  template: `
    <h3>You are: {{connected ? '' : 'not'}} connected to ZetaPush (Version: ${VERSION})</h3>
  `,
})
export class AppComponent {
  connected = false;
  constructor(private api: WelcomeApi, private connection: ZetaPushConnection) {
    console.log('AppComponent::constructor', connection);
    connection.connect().then(() => {
      this.connected = true;
    });
  }
}

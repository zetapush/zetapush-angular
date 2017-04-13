import { Component } from '@angular/core';

import { ZetaPushConnection } from 'zetapush-angular';

@Component({
  selector: 'demo-app',
  template: `
    <h3>You are: {{connected ? '' : 'not'}} connected to ZetaPush</h3>
  `,
})
export class AppComponent {
  connected = false;
  constructor(private connection: ZetaPushConnection) {
    console.log('AppComponent::constructor', connection);
    connection.connect().then(() => {
      this.connected = true;
    });
  }
}

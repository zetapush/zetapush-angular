import { Component } from '@angular/core';

@Component({
  selector: 'demo-app',
  template: `
    <my-lib></my-lib>
    <h3>Meaning is: {{meaning}}</h3>
  `,
})
export class AppComponent {
  meaning: number;
  constructor() {
    this.meaning = 42;
  }
}

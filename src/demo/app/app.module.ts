import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ZetaPushClientConfig, ZetaPushModule } from 'zetapush-angular';

import { AppComponent } from './app.component';
import { WelcomeApiProvider } from './welcome-api.provider';

@NgModule({
  imports: [
    BrowserModule,
    ZetaPushModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    { provide: ZetaPushClientConfig, useValue: { apiUrl: 'http://vm-zbo:8080/zbo/pub/business/', sandboxId: 'wfuggX5m' } },
    WelcomeApiProvider
  ]
})
export class AppModule { }

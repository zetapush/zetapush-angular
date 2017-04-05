import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ZetaPushModule } from 'zetapush-angular';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, ZetaPushModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

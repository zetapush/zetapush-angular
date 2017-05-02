[![NPM version][npm-version-image]][npm-url]

# zetapush-angular

Angular ZetaPush integration made easy

## Install

```console
yarn add zetapush-angular
```

## Using

### Configuration

```typescript
import { NgModule } from '@angular/core';
import { ZetaPushClientConfig, ZetaPushModule } from 'zetapush-angular';

@NgModule({
  imports: [
    ...
    ZetaPushModule
  ],
  ...
  providers: [
    { provide: ZetaPushClientConfig, useValue: { sandboxId: '<SET-YOUR-SANDBOX-ID>' } }
  ]
})
export class AppModule { }
```

### Connection

```typescript
import { Component } from '@angular/core';
import { ZetaPushConnection } from 'zetapush-angular';

@Component({
  ...
})
export class MyComponent {
  connected = false;
  constructor(private connection: ZetaPushConnection) {
    connection.connect().then(() => {
      this.connected = true;
    });
  }
}
```

### Api

Declare your **WelcomeApi**

```typescript
import { NgZone } from '@angular/core';
import { Api, ZetaPushClient, createApi } from 'zetapush-angular';

export class WelcomeApi extends Api {
  welcome(parameters: { message: string }): Promise<any> {
    return this.$publish('welcome', parameters);
  }
}

export function WelcomeApiFactory(client: ZetaPushClient, zone: NgZone): WelcomeApi {
  return createApi(client, zone, WelcomeApi) as WelcomeApi;
}

export const WelcomeApiProvider = {
  provide: WelcomeApi, useFactory: WelcomeApiFactory, deps: [ ZetaPushClient, NgZone ]
};
```

Add your provider to your app module

```typescript
import { NgModule } from '@angular/core';
import { WelcomeApiProvider } from './welcome-api';
import { ZetaPushClientConfig, ZetaPushModule } from 'zetapush-angular';

@NgModule({
  imports: [
    ...
    ZetaPushModule
  ],
  ...
  providers: [
    { provide: ZetaPushClientConfig, useValue: { sandboxId: '<SET-YOUR-SANDBOX-ID>' } },
    WelcomeApiProvider
  ]
})
export class AppModule { }
```

Inject **WelcomeApi** in your components

```typescript
import { Component, OnInit } from '@angular/core';
import { WelcomeApi } from './welcome-api';

@Component({
  ...
})
export class MyComponent implements OnInit{
  constructor(private api: WelcomeApi) {}
  ngOnInit() {
    this.api.welcome({ message: 'World!!' })
        .then((result) => console.log('welcome', result));
  }
}
```

[npm-version-image]: http://img.shields.io/npm/v/zetapush-angular.svg?style=flat-square
[npm-url]: https://npmjs.org/package/zetapush-angular

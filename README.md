# zetapush-angular

Angular(2+) ZetaPush integration made easy

## Warning

> This project is under active development and hasn't yet reached its final form.

## API

Declare your config

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

Connection

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

Api (Coming Soon)

```typescript

```

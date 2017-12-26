import { OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

export class Observer implements OnDestroy {
  protected subscriptions: Subscription[] = [];

  observe(subscription: Subscription) {
    this.subscriptions.push(subscription);
    return subscription;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}

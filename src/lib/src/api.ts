import { NgZone } from '@angular/core';

import { services } from 'zetapush-js';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publish';

import { ZetaPushClient } from './core';

const toPascalCase = (word = '') =>
  `${word.charAt(0).toUpperCase()}${word.substring(1)}`;

const getExtensionsAndListener = (Class: any, zone: NgZone) => {
  const filter = (element: string) => element !== 'constructor';
  const methods = Object.getOwnPropertyNames(Class.prototype).filter(filter);
  const extensions = {};
  const listener = methods.reduce((reducer, method) => {
    const source = new Observable((observer) => {
      reducer[method] = ({
        data,
      }: {
        data: { errors: Array<any>; result: any };
      }) => {
        console.trace(`Api::on${toPascalCase(method)}`, data);
        zone.run(() => {
          const { errors, result } = data;
          if (errors.length) {
            observer.error(result);
          } else {
            observer.next(result);
          }
        });
      };
    });
    const published = source.publish();
    extensions[`on${toPascalCase(method)}`] = published;
    published.connect();
    return reducer;
  }, {});
  return { extensions, listener };
};

const onErrorDefaultHandler = (errors: ApiError[], method: string) => {
  console.error(`Api::${method}`, errors);
  return errors;
};

export interface ApiError {
  code: string;
  location: string;
  message: string;
}

export interface ApiParameters {
  [property: string]: any;
}

export class Api extends services.Macro {
  $getUserId(): string {
    return '<abstract>';
  }
}

export function createApi<T extends Api>(
  client: ZetaPushClient,
  zone: NgZone,
  Type: any,
  onErrorHandler: (
    errors: ApiError[],
    method: string,
  ) => ApiError[] = onErrorDefaultHandler,
) {
  const { extensions, listener } = getExtensionsAndListener(Type, zone);
  const api = client.createAsyncMacroService({
    Type,
    listener,
  });
  const $publish = api.$publish;
  api.$publish = (
    method: string,
    parameters: ApiParameters = {},
    hardFail?: boolean,
    debug?: number,
  ) => {
    const promise = new Promise<any>((resolve, reject) => {
      console.trace(`Api::${method}`, parameters);
      const onSuccess = (message: any) => zone.run(() => resolve(message));
      const onError = (errors: any) => zone.run(() => reject(errors));
      $publish(method, parameters, hardFail, debug).then(onSuccess, onError);
    });
    promise.catch((errors: ApiError[]) =>
      onErrorDefaultHandler(errors, method),
    );
    return promise;
  };
  return Object.assign(api, extensions, {
    $getUserId: () => client.getUserId(),
  }) as T;
}

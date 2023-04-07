import ky from 'ky';
import { KyInstance } from 'ky/distribution/types/ky';

import { AdvancedRequestConfig } from '@shared/types';

export abstract class BaseApiService {
  private instance: KyInstance;

  protected constructor(baseUrl: string, headers?: Record<string, string>) {
    this.instance = ky.create({
      prefixUrl: baseUrl,
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8',
        ...headers,
      },
    });
  }

  protected async request<T, K>(config: AdvancedRequestConfig<T>) {
    return this.instance(config.url, {
      method: config.method,
      json: config.data,
      headers: config.headers,
      signal: config.abortSignal,
    }).json<K>();
  }
}

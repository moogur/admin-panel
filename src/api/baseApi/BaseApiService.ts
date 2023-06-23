import { isObject } from '@shared/type-guards';
import { AdvancedRequestConfig, ConfigForFetch } from '@shared/types';

import { HTTPError, baseHttpError524, baseHttpError499, baseHttpError520 } from './ApiError';

export abstract class BaseApiService {
  private _config: Required<ConfigForFetch>;

  constructor(config: Pick<ConfigForFetch, 'baseUrl'>) {
    this._config = {
      responseType: 'json',
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8',
      },
      ...config,
    };
  }

  protected async request<T, K>(config: AdvancedRequestConfig<T>): Promise<K> {
    let httpError = baseHttpError520;

    try {
      const mergedConfig: RequestInit = {
        method: config.method,
        signal: config.signal,
        headers: config.headers ? { ...this._config.headers, ...config.headers } : this._config.headers,
      };

      if ('body' in config) mergedConfig.body = JSON.stringify(config.body);

      const url = this._config.baseUrl + config.url;
      const response = await fetch(url, mergedConfig);

      if (response.ok) return await response.json();
      httpError = new HTTPError(response, new Request(url, mergedConfig));
    } catch (error) {
      if (isObject(error) && 'name' in error) {
        if (error.name === 'TimeoutError') httpError = baseHttpError524;
        if (error.name === 'AbortError') httpError = baseHttpError499;
      }
    }

    throw httpError;
  }
}

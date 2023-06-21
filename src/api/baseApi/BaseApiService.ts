import { isObject } from '@shared/type-guards';
import { AdvancedRequestConfig, ConfigForFetch } from '@shared/types';

import { ApiError, apiError520, apiError401, apiError404, apiError524, apiError499 } from './ApiError';

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
    try {
      const mergedConfig: RequestInit = {
        method: config.method,
        signal: config.signal,
        headers: config.headers ? { ...this._config.headers, ...config.headers } : this._config.headers,
      };

      if ('body' in config) mergedConfig.body = JSON.stringify(config.body);

      const response = await fetch(this._config.baseUrl + config.url, mergedConfig);

      if (response.ok) return await response.json();

      if (response.status === 401) throw apiError401;
      if (response.status === 404) throw apiError404;
      throw new ApiError(response.status, response.statusText);
    } catch (error) {
      if (error instanceof ApiError) throw error;

      if (isObject(error) && 'name' in error) {
        if (error.name === 'TimeoutError') throw apiError524;
        if (error.name === 'AbortError') throw apiError499;
      }

      throw apiError520;
    }
  }
}

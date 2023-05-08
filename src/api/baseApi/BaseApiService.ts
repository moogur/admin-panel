import ky, { HTTPError, Options } from 'ky';
import { KyInstance } from 'ky/distribution/types/ky';

import { isObject } from '@shared/type-guards';
import { AdvancedRequestConfig } from '@shared/types';

import { ApiError, apiError520, apiError401, apiError404, apiError524, apiError499 } from './ApiError';

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
    try {
      const preparedConfig: Options = {
        method: config.method,
        headers: config.headers,
        signal: config.abortSignal,
      };
      if ('data' in config) preparedConfig.json = config.data;

      const result = await this.instance(config.url, preparedConfig);

      return await result.json<K>();
    } catch (error) {
      if (isObject(error) && 'name' in error) {
        if (error.name === 'TimeoutError') throw apiError524;
        if (error.name === 'AbortError') throw apiError499;
      }

      if (error instanceof HTTPError) {
        if (error.response.status === 401) throw apiError401;
        if (error.response.status === 404) throw apiError404;

        const response = await error.response.json();
        throw new ApiError(response.statusCode, response.message, response.errors);
      }

      throw apiError520;
    }
  }
}

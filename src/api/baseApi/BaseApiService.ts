import { isObject } from '@shared/type-guards';
import { AdvancedRequestConfig, ConfigForFetch } from '@shared/types';

import { HTTPError, baseHttpError524, baseHttpError499, baseHttpError520 } from './ApiError';

export abstract class BaseApiService {
  private _config: Required<ConfigForFetch>;

  constructor(config: Pick<ConfigForFetch, 'baseUrl'>) {
    this._config = {
      convertResponse: 'json',
      responseType: 'json',
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8',
      },
      baseUrl: config.baseUrl,
    };
  }

  protected async request<Body, Url, Query, ReturnType>(
    config: AdvancedRequestConfig<Body, Url, Query>,
  ): Promise<ReturnType> {
    let httpError = baseHttpError520;

    try {
      const preparedConfig = this.prepareConfig(config);
      const response = await fetch(preparedConfig.url, preparedConfig.config);

      if (response.ok) return await response[preparedConfig.convertResponse]();
      httpError = new HTTPError(response, new Request(preparedConfig.url, preparedConfig.config));
    } catch (error) {
      if (isObject(error) && 'name' in error) {
        if (error.name === 'TimeoutError') httpError = baseHttpError524;
        if (error.name === 'AbortError') httpError = baseHttpError499;
      }
    }

    throw httpError;
  }

  protected convertFileToUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  private prepareConfig<Body, Url, Query>(externalConfig: AdvancedRequestConfig<Body, Url, Query>) {
    let url = this._config.baseUrl + externalConfig.url;
    const config: RequestInit = {
      method: externalConfig.method,
      signal: externalConfig.signal,
      headers: externalConfig.headers ?? this._config.headers,
    };

    if ('body' in externalConfig) {
      config.body = externalConfig.body instanceof FormData ? externalConfig.body : JSON.stringify(externalConfig.body);
    }

    if ('queryParameters' in externalConfig) {
      url += `${this.converterQueryToString(externalConfig.queryParameters)}`;
    }

    return {
      config,
      url,
      convertResponse: externalConfig.convertResponse ?? this._config.convertResponse,
    };
  }

  private converterQueryToString<T>(queryParameters: T): string {
    if (isObject(queryParameters)) {
      return Object.entries(queryParameters).reduce<string>((accumulator, [key, value], index) => {
        accumulator += this.convertValueToString(key, value, index);

        return accumulator;
      }, '');
    }

    return '';
  }

  private convertValueToString<T>(key: string, value: T, index: number): string {
    const valueInString = `${key}=${String(value)}`;

    return index ? `&${valueInString}` : `?${valueInString}`;
  }
}

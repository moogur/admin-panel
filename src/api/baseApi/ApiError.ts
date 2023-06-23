import { emptyResponse } from '@shared/constants';

export class HTTPError extends Error {
  public response: Response;

  public request: Request | null;

  constructor(response: Response, request: Request | null) {
    const code = response.status || response.status === 0 ? response.status : '';
    const title = response.statusText || '';
    const status = `${code} ${title}`.trim();
    const reason = status ? `status code ${status}` : 'an unknown error';

    super(`Request failed with ${reason}`);

    this.name = 'HTTPError';
    this.response = response;
    this.request = request;
  }
}

export const baseHttpError499 = new HTTPError({ ...emptyResponse, status: 499, statusText: 'AbortError' }, null);
export const baseHttpError520 = new HTTPError({ ...emptyResponse, status: 520, statusText: 'Unknown Error' }, null);
export const baseHttpError524 = new HTTPError({ ...emptyResponse, status: 524, statusText: 'TimeoutError' }, null);

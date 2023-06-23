import { HTTPError, baseHttpError520 } from '@api/baseApi';

export function prepareError(error: unknown): HTTPError {
  return error instanceof HTTPError ? error : baseHttpError520;
}

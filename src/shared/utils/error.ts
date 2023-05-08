import { ApiError, apiError520 } from '@api/baseApi';

export function prepareError(error: unknown): ApiError {
  return error instanceof ApiError ? error : apiError520;
}

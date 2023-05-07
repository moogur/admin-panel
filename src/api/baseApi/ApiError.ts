export class ApiError extends Error {
  constructor(public statusCode: number, public message: string, public errors?: Record<string, string[]>) {
    super();
  }
}

export const apiError520 = new ApiError(520, 'Unknown Error');
export const apiError401 = new ApiError(401, 'Unauthorized');
export const apiError404 = new ApiError(404, 'Not found');
export const apiError524 = new ApiError(524, 'TimeoutError');

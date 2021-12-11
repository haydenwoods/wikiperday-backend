export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(`Invalid request: ${message}`, 400);
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string) {
    super(`Internal: ${message}`, 500);
  }
}

export const UNAUTHENTICATED_ERROR = "JWT is invalid or not provided.";

export class UnauthenticatedError extends ApiError {
  constructor(message: string = UNAUTHENTICATED_ERROR) {
    super(message, 401);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(`Forbidden: ${message}`, 403);
  }
}
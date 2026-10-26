import { HttpError } from '#backend/utils/http-error.js';

export const notFound = (_req, _res, next) => next(new HttpError(404, 'Not found'));

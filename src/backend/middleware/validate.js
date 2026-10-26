import { HttpError } from '#backend/utils/http-error.js';

export const validate =
  (schema, source = 'body') =>
  (req, _res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return next(new HttpError(400, 'Validation failed', result.error.issues));
    }

    req.validated = { ...req.validated, [source]: result.data };
    next();
  };

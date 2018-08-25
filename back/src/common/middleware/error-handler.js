// eslint-disable-next-line max-params
module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);
  const statusCode = (err && err.statusCode) || 500;
  const errorJson = {'error': {
    statusCode,
    'name': 'Unknown Error',
    'message': 'Unknown Error',
  }};

  if (typeof err === 'string' || err instanceof String) {
    errorJson.error.message = err;
  }
  if (err && err.name) {
    errorJson.error.name = err.name;
    errorJson.error.message = err.message;
    errorJson.error.stack = err.stack;
    errorJson.error.errors = err.errors;
  }
  if (process.env.NODE_ENV === 'production') {
    delete errorJson.error.details;
    delete errorJson.error.stack;
  }
  res.status(statusCode).json(errorJson);
};

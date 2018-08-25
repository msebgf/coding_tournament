// const app = require('../../app');
const errorHandler = require('./error-handler');

describe('error-handler middleware', () => {
  let err, req, res, next;

  beforeEach(() => {
    err = new Error('oops');
    err.statusCode = 403;
    req = {};
    res = {
      'status': jest.fn().mockReturnThis(),
      'json': jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  test('should call next when res.headersSent', () => {
    res.headersSent = true;
    errorHandler(err, req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(err);
  });

  test('should not call next otherwise', () => {
    res.headersSent = false;
    errorHandler(err, req, res, next);
    expect(next).not.toBeCalled();
  });

  test('should log the error to the console', () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();
    errorHandler(err, req, res, next);
    expect(console.error).toHaveBeenCalledWith(err);
    console.error = originalConsoleError;
  });

  test('should call res.status with the right value', () => {
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(err.statusCode);
  });

  test('should call res.status with the right value', () => {
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(err.statusCode);
  });

  test('should respond with the error json', () => {
    errorHandler(err, req, res, next);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      'error': {
        'statusCode': err.statusCode,
        'name': err.name,
        'message': err.message,
        'stack': expect.stringContaining(err.stack),
      },
    });
  });

  test('when no err.statusCode, it should assume 500', () => {
    delete err.statusCode;
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      'error': expect.objectContaining({
        'statusCode': 500,
      }),
    });
  });

  test('should work when err is a string', () => {
    const errorString = 'Im a string';
    errorHandler(errorString, req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      'error': {
        'statusCode': 500,
        'name': 'Unknown Error',
        'message': errorString,
      },
    });
  });

  test('should work when err is null?', () => {
    errorHandler(null, req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      'error': {
        'statusCode': 500,
        'name': 'Unknown Error',
        'message': 'Unknown Error',
      },
    });
  });

  describe('NODE_ENV === production', () => {
    let originalNodeEnv;

    beforeEach(() => {
      originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
    });

    afterEach(() => {
      process.env.NODE_ENV = originalNodeEnv;
    });

    test('should not return the stack', () => {
      errorHandler(err, req, res, next);
      expect(res.json.mock.calls[0][0].error.stack).toBeUndefined();
    });

    test('should not return error details', () => {
      err.errors = [{}];
      errorHandler(err, req, res, next);
      expect(res.json.mock.calls[0][0].error.details).toBeUndefined();
    });
  });
});

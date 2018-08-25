const ErrorHelper = require('./error-helper');

describe('ErrorHelper', () => {
  describe('buildError', () => {
    test('should return an error object with the given statusCode, message and error', () => {
      const statusCode = 500;
      const message = 'Ops, something happened';
      const original = new Error('this is the cause');
      const error = ErrorHelper.buildError(statusCode, message, original);
      expect(error.statusCode).toEqual(statusCode);
      expect(error.message).toEqual(message);
      expect(error.original).toEqual(original);
      expect(error.stack).toContain(message);
      expect(error.stack).toContain(original.stack);
    });

    test('should work without original error', () => {
      const statusCode = 500;
      const message = 'Ops, something happened';
      const error = ErrorHelper.buildError(statusCode, message);
      expect(error.statusCode).toEqual(statusCode);
      expect(error.message).toEqual(message);
      expect(error.stack.split('\n').length).toBeGreaterThan(5);
    });

    test('should work without message', () => {
      const statusCode = 500;
      const original = new Error('this is the cause');
      const error = ErrorHelper.buildError(statusCode, original);
      expect(error).toEqual(original);
      expect(error.statusCode).toEqual(statusCode);
    });
  });
});

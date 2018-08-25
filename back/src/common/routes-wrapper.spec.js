const routesWrapper = require('./routes-wrapper');

describe('routes-wrapper', () => {
  test('should call the passed function', async() => {
    const fn = jest.fn(() => Promise.resolve());
    await routesWrapper(fn)();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should catch every unhandled promise', async() => {
    const catchFn = jest.fn();
    await routesWrapper(() => Promise.reject('should not throw error'))(null, null, catchFn);
    expect(catchFn).toHaveBeenCalledTimes(1);
  });

  test('should catch when function throws an error', async() => {
    const catchFn = jest.fn();
    await routesWrapper(() => {
      throw new Error('should not throw error');
    })(null, null, catchFn);
    expect(catchFn).toHaveBeenCalledTimes(1);
  });
});

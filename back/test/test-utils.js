module.exports = class TestUtils {
  static getExpectedSequelizeError(message) {
    return expect.objectContaining({'errors': [
      expect.objectContaining({message}),
    ]});
  }

  static getExpectedJsonError(message) {
    return {
      'error': expect.objectContaining({
        'message': expect.stringContaining(message),
      }),
    };
  }

  static async testValidationPass(Model, data) {
    const item = Model.build(data);
    await item.validate();
    return item;
  }

  static async testValidationFail(Model, data, message) {
    const expectedError = TestUtils.getExpectedSequelizeError(message);
    const item = Model.build(data);
    try {
      await item.validate();
      fail(`validation should fail with error ${message}`);
    } catch (e) {
      expect(e).toEqual(expectedError);
    }
  }

  static setupSpy(obj, methodName) {
    let originalMethod;

    beforeEach(() => {
      originalMethod = obj[methodName];
      obj[methodName] = jest.fn();
    });

    afterEach(() => {
      obj[methodName] = originalMethod;
    });
  }
};

describe('config', () => {
  let config;

  describe('without env variables', () => {
    beforeEach(() => {
      config = require('./config').getConfig();
    });

    test('should return default values', () => {
      expect(config).toEqual(expect.objectContaining({
        'app': expect.objectContaining({
          'port': expect.any(Number),
          'path': '/api',
        }),
        'db': expect.objectContaining({
          'uri': expect.any(String),
        }),
      }));
    });
  });

  describe('with env variables', () => {
    let initialEnv;

    /* eslint-disable */
    beforeEach(() => {
      initialEnv = process.env;
      process.env.DELIKTUM_DB_URI = 'mongodb://192.178.10.15:27017/_deliktum';
      process.env.DELIKTUM_APP_PORT = '4000';
      process.env.DELIKTUM_APP_PATH = '/whatever';
      jest.resetModules();
      config = require('./config').getConfig();
    });
    /* eslint-enable */

    afterEach(() => {
      process.env = initialEnv;
      jest.resetModules();
    });

    test('should return env variables values', () => {
      expect(config).toEqual(expect.objectContaining({
        'app': expect.objectContaining({
          'port': 4000,
          'path': '/whatever',
        }),
        'db': expect.objectContaining({
          'uri': 'mongodb://192.178.10.15:27017/_deliktum',
        }),
      }));
    });
  });
});

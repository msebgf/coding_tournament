const supertest = require('supertest');
const AppFactory = require('../app');
const docker = require('../../test/helpers/docker');

describe('health', () => {
  let app, appFactory;

  beforeAll(async() => {
    const port = await docker.getExternalPort('mongo', '27017');
    const host = await docker.getHost();
    const dbUri = `mongodb://${host}:${port}/_deliktum`;
    appFactory = new AppFactory(dbUri);
  });

  const createApp = async() => {
    const theApp = appFactory.getApp();
    await theApp.setup();
    return theApp;
  };

  const createFailingApp = async() => {
    const theApp = appFactory.getApp();
    theApp.mongoose.connect = jest.fn().mockImplementationOnce(() => Promise.reject(new Error('Im erroring')));
    await theApp.setup();
    return theApp;
  };

  const tearDownApp = async(theApp) => {
    return theApp.teardown();
  };

  beforeEach(async() => {
    app = await createApp();
  });

  afterEach(async() => {
    await tearDownApp(app);
  });

  describe('GET /health', () => {
    // eslint-disable-next-line
    const ISO8601_REGEX = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

    const executeRequest = () => {
      return supertest(app).get('/health');
    };

    test('should return 200, with a JSON object with health info', async() => {
      const response = await executeRequest().expect(200).expect('Content-Type', /json/);
      expect(response.body).toEqual({
        'started': expect.any(String),
        'uptime': expect.any(Number),
        'status': {
          'db': 'OK',
        },
        'environment': 'development',
      });

      expect(response.body.started).toMatch(ISO8601_REGEX);
    });

    describe('when db is down', () => {
      beforeEach(async() => {
        await tearDownApp(app);
        app = await createFailingApp();
      });

      afterEach(async() => {
        await tearDownApp(app);
      });

      test('it should return 503', async() => {
        await executeRequest().expect(503);
      });
    });
  });
});

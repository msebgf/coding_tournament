const config = require('../config/config').getConfig();
const QuerySchema = require('./queries/schema');
const docker = require('../test/helpers/docker');
const AppFactory = require('./app');
const uuid = require('uuid/v4');

describe('app', () => {
  let app, port, host;

  beforeAll(async() => {
    port = await docker.getExternalPort('mongo', '27017');
    host = await docker.getHost();
  });

  beforeEach(async() => {
    app = new AppFactory().getApp();
    app.mongoose.connect = jest.fn(() => Promise.resolve());
    app.mongoose.model = jest.fn(() => () => QuerySchema);
    await app.setup();
  });

  afterEach(async() => {
    await app.teardown();
  });

  const sampleRoutes = expect.arrayContaining([
    expect.objectContaining({
      'route': expect.objectContaining({
        'path': '/test-sample-routes',
        'methods': expect.objectContaining({
          'get': true,
          'post': true,
          'delete': true,
        }),
      }),
    }),
  ]);

  test('should add the api routes', () => {
    // eslint-disable-next-line no-underscore-dangle
    expect(app._router.stack).toEqual(sampleRoutes);
  });

  describe('when db uri is passed', () => {
    let dbUri;

    beforeEach(async() => {
      dbUri = `mongodb://${host}:${port}/${uuid()}`;
      app = new AppFactory(dbUri).getApp();
      app.mongoose.connect.mockClear();
      app.mongoose.model.mockClear();
      await app.setup();
    });

    afterEach(async() => {
      await app.teardown();
    });

    test('should setup mongoose with the db uri passed', () => {
      expect(app.mongoose.connect).toHaveBeenCalledTimes(1);
      expect(app.mongoose.connect).toHaveBeenCalledWith(dbUri);
    });
  });

  test('should setup mongoose with values from config', () => {
    expect(app.mongoose.connect).toHaveBeenCalledTimes(1);
    expect(app.mongoose.connect).toHaveBeenCalledWith(config.db.uri);
  });

  describe('.db', () => {
    test('should export the Query models', () => {
      expect(app.db.SMQuery).toEqual(expect.any(Function));
      expect(app.mongoose.model).toHaveBeenCalledTimes(1);
      expect(app.mongoose.model).toHaveBeenCalledWith('SMQuery', QuerySchema);
    });
  });

  test('.info.startTime should save an start date', () => {
    expect(app.info.startTime).toBeInstanceOf(Date);
  });
});

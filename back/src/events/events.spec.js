const supertest = require('supertest');
const config = require('../../config/config').getConfig();
const TestUtils = require('../../test/test-utils');
const docker = require('../../test/helpers/docker');
const FixturesHelper = require('../../test/fixtures/fixtures-helper');
const data = require('../../test/fixtures/data');
const uuid = require('uuid/v4');
const AppFactory = require('../app');
const mongoose = require('mongoose');

describe('query', () => {
  const appPath = config.app.path;
  let eventData, fixturesHelper, app, port, host;

  beforeAll(async() => {
    port = await docker.getExternalPort('mongo', '27017');
    host = await docker.getHost();
  });
  
  beforeEach(async() => {
    const dbUri = `mongodb://${host}:${port}/${uuid()}`;
    app = new AppFactory(dbUri).getApp();
    await app.setup();
    eventData = {
      'type': 'ASALTO',
      'coordinates': {
        'lat': 1234,
        'long': 1234,
      },
      'description': 'A very long description with the report details',
    };
    fixturesHelper = new FixturesHelper(app);
    await fixturesHelper.setup();
  });

  afterEach(async() => {
    await app.teardown();
  });

  describe('POST /api/events', () => {
    let eventId;

    afterEach(async() => {
      const id = mongoose.Types.ObjectId(eventId);
      await app.db.Event.remove({'_id': id});
    });

    const executeValidRequest = () => {
      return supertest(app).post(`${appPath}/events`).send(eventData);
    };

    test('should return 201 with the created document', async() => {
      const response = await executeValidRequest()
        .expect(201)
        .expect('Content-Type', /json/);
      eventId = response.body._id;
    });
  });
});

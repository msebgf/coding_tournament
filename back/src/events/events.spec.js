const supertest = require('supertest');
const config = require('../../config/config').getConfig();
const TestUtils = require('../../test/test-utils');
const docker = require('../../test/helpers/docker');
const FixturesHelper = require('../../test/fixtures/fixtures-helper');
const data = require('../../test/fixtures/data');
const uuid = require('uuid/v4');
const AppFactory = require('../app');
const mongoose = require('mongoose');

describe('event', () => {
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
      'date': '2018/10/24',
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

    const executeRequest = () => {
      return supertest(app).post(`${appPath}/events`).send(eventData);
    };

    test('should return 201 with the created event', async() => {
      const response = await executeRequest()
        .expect(201)
        .expect('Content-Type', /json/);
      eventId = response.body._id;
    });

    describe('should throw an error', () => {
      test('when type us missing', async() => {
        delete eventData.type;
        await executeRequest()
          .expect(400)
      });

      test('when description is missing', async() => {
        delete eventData.description;
        await executeRequest()
          .expect(400)
      });

      test('when coordinates is missing', async() => {
        delete eventData.coordinates;
        await executeRequest()
          .expect(400)
      });

      test('when date is missing', async() => {
        delete eventData.date;
        await executeRequest()
          .expect(400)
      });
    });
  });
});

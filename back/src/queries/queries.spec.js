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
  let queryData, fixturesHelper, app, port, host;

  beforeAll(async() => {
    port = await docker.getExternalPort('mongo', '27017');
    host = await docker.getHost();
  });
  
  beforeEach(async() => {
    const dbUri = `mongodb://${host}:${port}/${uuid()}`;
    app = new AppFactory(dbUri).getApp();
    await app.setup();
    queryData = {
      'title': 'High School Permissions 2',
      'resourceKey': 'nuevaappdeprueba2',
      'fields': [{
        'key': 'salary2',
      }, {
        'key': 'initiator.email',
      }, {
        'key': 'section2',
      },
      ],
      'filters': [{
        'type': 'filterTitle',
        'label': 'First Title',
      }, {
        'type': 'filterItem',
        'key': 'initiator.email',
        'defaultValue': ['sguerrero@devsu.com'],
      }, {
        'type': 'filterItem',
        'key': 'age',
        'defaultValue': [27, 30, 32],
      }],
    };
    fixturesHelper = new FixturesHelper(app);
    await fixturesHelper.setup();
  });

  afterEach(async() => {
    await app.teardown();
  });

  describe('POST /api/queries', () => {
    let queryId;

    afterEach(async() => {
      const id = mongoose.Types.ObjectId(queryId);
      await app.db.SMQuery.remove({'_id': id});
    });

    const executeValidRequest = () => {
      return supertest(app).get(`${appPath}/queries`);
    };

    test('should return 201 with the created document', async() => {
      const response = await executeValidRequest()
        .expect(200)
        .expect('Content-Type', /json/);
      queryId = response.body._id;
    });
  });
});

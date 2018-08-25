const data = require('../fixtures/data');
const mongoose = require('mongoose');

module.exports = class FixturesHelper {
  constructor(app) {
    this.app = app;
  }

  async setup() {
    const db = this.app.db;

    await db.SMQuery.remove({});

    const promises = data.queries.map((query) => {
      query._id = mongoose.Types.ObjectId(query.id);
      delete query.id;
      const newQuery = db.SMQuery.create(query);
      query.id = String(query._id);
      return newQuery;
    });

    return Promise.all(promises);
  }

  async recreateQuery(id) {
    const db = this.app.db;
    const queryData = data.queries.find((query) => query.id === id);
    await db.SMQuery.remove({'_id': queryData.id, 'realm': queryData.realm});
    return await db.SMQuery.create(queryData);
  }
};

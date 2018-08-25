const data = require('../fixtures/data');
const mongoose = require('mongoose');

module.exports = class FixturesHelper {
  constructor(app) {
    this.app = app;
  }

  async setup() {
    const db = this.app.db;

    await db.Event.remove({});

    const promises = data.events.map((event) => {
      event._id = mongoose.Types.ObjectId(event.id);
      delete event.id;
      const newQuery = db.Event.create(event);
      event.id = String(event._id);
      return newQuery;
    });

    return Promise.all(promises);
  }

  async recreateEvent(id) {
    const db = this.app.db;
    const eventData = data.events.find((event) => event.id === id);
    await db.Event.remove({'_id': eventData.id});
    return await db.Event.create(eventData);
  }
};

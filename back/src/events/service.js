const ErrorHelper = require('../common/helpers/error-helper');
const mongoose = require('mongoose');

module.exports = class {
  constructor(schemas) {
    this.Event = schemas.Event;
  }

  async findAll(realm) {
    return await this.Event.findAll();
  }

  async findOne(realm, id) {
    const queryId = mongoose.Types.ObjectId(id);
    return await this.Event.findOne({'_id': queryId});
  }

  async createEvent(event) {
    return await this.Event.create(event);
  }
};

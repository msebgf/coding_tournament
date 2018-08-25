const ErrorHelper = require('../common/helpers/error-helper');

module.exports = class {
  constructor(schemas) {
    this.Event = schemas.Event;
  }

  _validateEvent(event) {
    if (!event.type || !event.date || !event.description || !event.coordinates) {
      throw ErrorHelper.buildError(400, 'Missing fields');
    }
  }

  async createEvent(event) {
    this._validateEvent(event);
    return await this.Event.create(event);
  }
};

const ErrorHelper = require('../common/helpers/error-helper');
const mongoose = require('mongoose');

module.exports = class {
  constructor(schemas) {
    this.SMQuery = schemas.SMQuery;
  }

  async findAll(realm) {
    return await this.SMQuery.find({realm});
  }

  async findOne(realm, id) {
    const queryId = mongoose.Types.ObjectId(id);
    return await this.SMQuery.findOne({'_id': queryId, realm});
  }
};

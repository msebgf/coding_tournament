const express = require('express');
const path = require('path');
const glob = require('glob');
const mongoose = require('mongoose');
const config = require('../config/config').getConfig();
const QuerySchema = require('./queries/schema');

class AppFactory {
  constructor(dbUri) {
    this.dbUri = dbUri || config.db.uri;
  }

  getApp() {
    const self = this;
    const app = express();

    app.mongoose = mongoose;

    app.setup = async() => {
      return self.setup(app);
    };

    app.teardown = async() => {
      return self.teardown(app);
    };

    return app;
  }

  async setup(app) {
    await this._setupDatabase(app);
    this._setupMiddleware(app);
    this._setupRoutes(app);
    this._setupMiddlewarePost(app);
    app.info = {'startTime': new Date()};
  }

  async teardown(app) {
    return app.mongoose.disconnect();
  }

  async _setupDatabase(app) {
    const SMQuery = app.mongoose.model('SMQuery', QuerySchema);
    app.db = {SMQuery};
    return app.mongoose.connect(this.dbUri).then(() => {
      app.db.initialized = true;
    }).catch((e) => {
      // eslint-disable-next-line no-console
      console.error(e);
      // process.exit(1);
    });
  }

  _setupRoutes(app) {
    const routesFiles = glob.sync('src/**/routes.js');
    routesFiles.forEach((file) => {
      require(path.join(process.cwd(), file))(app);
    });
  }

  _setupMiddleware(app) {
    const file = 'src/common/middleware.js';
    require(path.join(process.cwd(), file))(app);
  }

  _setupMiddlewarePost(app) {
    const file = 'src/common/middleware.post-routes.js';
    require(path.join(process.cwd(), file))(app);
  }
}

module.exports = AppFactory;

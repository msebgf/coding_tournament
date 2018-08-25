module.exports = (app) => {
  const config = require('../../config/config').getConfig();
  const appPath = config.app.path;
  const eventController = require('./controller')(app);
  const routesWrapper = require('../common/routes-wrapper');

  app.route(`${appPath}/events`)
    .post(routesWrapper(eventController.create))
};

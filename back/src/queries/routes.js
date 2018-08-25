module.exports = (app) => {
  const config = require('../../config/config').getConfig();
  const appPath = config.app.path;
  const queryController = require('./controller')(app);
  const routesWrapper = require('../common/routes-wrapper');

  app.route(`${appPath}/queries`)
    .get(routesWrapper(queryController.findAll))
};

module.exports = (app) => {
  const healthController = require('./controller')(app);
  const routesWrapper = require('../common/routes-wrapper');

  app.route('/health').get(routesWrapper(healthController.getHealth));
};

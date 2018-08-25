const routesWrapper = require('../../src/common/routes-wrapper');

module.exports = (app) => {
  /* eslint-disable no-empty-function */
  app.route('/test-sample-routes')
    .get(routesWrapper(() => {}))
    .post(routesWrapper(() => {}))
    .delete(routesWrapper(() => {}));
  /* eslint-enable no-empty-function */
};

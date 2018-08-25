const errorHandler = require('./middleware/error-handler');

module.exports = (app) => {
  app.use(errorHandler);
};

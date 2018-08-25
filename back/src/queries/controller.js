const QueriesService = require('./service');

module.exports = (app) => {
  const service = new QueriesService(app.db);

  return {
    async findAll(req, res) {
      return res.status(200).json({});
    },
  };
};

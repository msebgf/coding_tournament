const HealthService = require('./service');

module.exports = (app) => {
  const healthService = new HealthService(app);

  return {
    async getHealth(req, res) {
      try {
        const healthStatus = await healthService.getHealthStatus();
        res.json(healthStatus);
      } catch (e) {
        e.statusCode = 503;
        throw e;
      }
    },
  };
};

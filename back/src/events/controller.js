const EventsService = require('./service');

module.exports = (app) => {
  const service = new EventsService(app.db);

  return {
    async findAll(req, res) {
      return res.status(200).json({});
    },

    async create(req, res) {
      const event = await service.createEvent(req.body);
      return res.status(201).json(event)
    },
  };
};

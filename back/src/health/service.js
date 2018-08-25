module.exports = class {
  constructor(app) {
    this.app = app;
  }

  async getHealthStatus() {
    if (!this.app.db.initialized) {
      throw Error('Database not initialized');
    }

    return {
      'started': this.app.info.startTime,
      'uptime': (new Date().getTime() - this.app.info.startTime.getTime()) / 1000,
      'status': {
        'db': 'OK',
      },
      'environment': process.env.NODE_ENV,
    };
  }
};

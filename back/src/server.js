const AppFactory = require('./app');
const config = require('../config/config').getConfig();

module.exports = setupApp;

async function setupApp(dbUri) {
  const app = new AppFactory(dbUri).getApp();

  // missing unit test for next line
  app.set('trust proxy', true);

  await app.setup().then(() => {
    app.listen(config.app.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Smartmate Queries listening on ${config.app.port}`);
    });
  });

  return {
    'stop': () => {
      return app.teardown();
    },
  };
}

// TODO: Pruebas + catch

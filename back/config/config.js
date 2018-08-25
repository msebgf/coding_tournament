module.exports = {
  'getConfig': () => ({
    'app': {
      'port': parseInt(process.env.DELIKTUM_APP_PORT, 10) || 3000,
      'path': process.env.DELIKTUM_APP_PATH || '/api',
    },
    'db': {
      'uri': process.env.DELIKTUM_DB_URI || 'mongodb://127.0.0.1:27017/_deliktum',
    },
  }),
};

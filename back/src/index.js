const config = require('../config/config').getConfig();
const server = require('./server');

module.exports = server(config.db.uri);

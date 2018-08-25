const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');


let loggingFormat = 'dev';

if (process.env.NODE_ENV === 'production') {
  loggingFormat = 'combined';
}

// TODO: add log error middleware
module.exports = (app) => {
  const corsOptions = {
    'origin': true,
    'allowedHeaders': ['Authorization', 'Content-Type'],
    'methods': ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  };
  app.use(morgan(loggingFormat));

  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({'extended': false}));

};

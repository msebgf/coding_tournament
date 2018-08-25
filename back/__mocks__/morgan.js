const morgan = require.requireActual('morgan');
const morganInstance = morgan('dev');
module.exports = jest.fn().mockReturnValue(morganInstance);

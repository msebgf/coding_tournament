const express = require.requireActual('express');
const app = express();

module.exports = jest.fn(() => {
  return app;
});

const mongoose = require('mongoose');
const QueryModel = require('./schema');

describe('Query Model', () => {
  it('should return a mongoose model', () => {
    expect(QueryModel instanceof mongoose.Schema).toBeTruthy();
  });
});

const mongoose = require('mongoose');
const EventModel = require('./schema');

describe('Event Model', () => {
  it('should return a mongoose model', () => {
    expect(EventModel instanceof mongoose.Schema).toBeTruthy();
  });
});

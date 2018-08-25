const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
  'type': {'type': String, 'required': true},
  'description': {'type': String, 'required': true},
  'coordinates': {
    'lat': {'type': Number, 'required': true},
    'long': {'type': Number, 'required': true},
  },
}, {'versionKey': false});

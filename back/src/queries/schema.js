const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
  'id': String,
  'title': {'type': String, 'required': true},
}, {'versionKey': false});

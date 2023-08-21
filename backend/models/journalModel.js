const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalSchema = new Schema({
  sleep: {
    type: Number,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  happiness: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Journal', journalSchema);
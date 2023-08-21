const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutDetailsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  load: {
    type: Number,
    requried: true
  },
  days: {
    type: Array,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('WorkoutDetails', workoutDetailsSchema);
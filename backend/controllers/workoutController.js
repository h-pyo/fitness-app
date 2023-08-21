const WorkoutDetails = require('../models/workoutDetailsModel');
const mongoose = require('mongoose');

//Get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await WorkoutDetails.find({user_id}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

//Create a workout
const createWorkout = async (req, res) => {
  const { title, reps, load, days } = req.body;

  let emptyFields = [];
  if (!title) {
    emptyFields.push('title');
  }
  if (!reps) {
    emptyFields.push('reps');
  }
  if (!load) {
    emptyFields.push('load');
  }
  if (!days) {
    emptyFields.push('days');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the required fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const workoutDetails = await WorkoutDetails.create({
      title,
      reps,
      load,
      days,
      user_id
    });
    res.status(200).json(workoutDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  //checking if id is valid to use to find specific workout
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout exists' });
  }
  const workout = await WorkoutDetails.findByIdAndDelete(id);
  if (!workout) {
    return res.status(404).json({ error: 'No such workout exists' });
  } else {
    return res.status(200).json(workout);
  }
};

module.exports = {
  getWorkouts,
  createWorkout,
  deleteWorkout
};
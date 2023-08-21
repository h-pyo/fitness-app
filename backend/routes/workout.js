const express = require('express');
const { getWorkouts, createWorkout, deleteWorkout } = require('../controllers/workoutController');
const requireUserAuth = require('../middleware/requireUserAuth');
const router = express.Router();

//Require authorization to access the workout routes
router.use(requireUserAuth);

//------------------------routes------------------------------

//Get all workouts for a user
router.get('/', getWorkouts);

//Create a new workout
router.post('/', createWorkout);

//Delete a workout
router.delete('/:id', deleteWorkout);

module.exports = router;
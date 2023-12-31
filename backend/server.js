const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const workoutDataRoutes = require('./routes/workout');
const userRoutes = require('./routes/user');
const journalRoutes = require('./routes/journal');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const app = express();

//middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use('/server/workouts', workoutDataRoutes);
app.use('/server/user', userRoutes);
app.use('/server/journal', journalRoutes);

//connecting to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
      //listen for requests
      app.listen(process.env.PORT, () => {
      });
   })
  .catch((error) => {
    console.log(error);
  });

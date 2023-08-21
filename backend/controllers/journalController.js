const Journal = require('../models/journalModel');
const mongoose = require('mongoose');

//Get journal entries
const getEntries = async (req, res) => {
  const user_id = req.user._id;
  const entries = await Journal.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(entries);
};

//Create journal entry
const createEntry = async (req, res) => {
  const { sleep, calories, happiness, notes } = req.body;

  let emptyFields = [];
  if (!sleep) {
    emptyFields.push('sleep');
  }
  if (!calories) {
    emptyFields.push('calories');
  }
  if (!happiness) {
    emptyFields.push('happiness');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the required fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const entry = await Journal.create({
      sleep,
      calories,
      happiness,
      notes,
      user_id
    });
    res.status(200).json(entry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete an entry
const deleteEntry = async (req, res) => {
  const { id } = req.params;
  //checking if id id valid to use to find a specific entry
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such entry exists' });
  }
  const entry = await Journal.findByIdAndDelete(id);
  if (!entry) {
    return res.status(404).json({ error: 'No such entry exists' });
  } else {
    return res.status(200).json(entry);
  }
};

module.exports = {
  getEntries,
  createEntry,
  deleteEntry
};
const express = require('express');
const { getEntries, createEntry, deleteEntry } = require('../controllers/journalController');
const requireUserAuth = require('../middleware/requireUserAuth');
const router = express.Router();

//Require authorization to access the workout routes
router.use(requireUserAuth);

//------------------------routes------------------------------

//Get all entries for a user
router.get('/', getEntries);

//Create a new entry
router.post('/', createEntry);

//Delete an entry
router.delete('/:id', deleteEntry);

module.exports = router;
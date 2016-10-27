var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController.js');

router.get('/', notes.showIndex);

router.get('/noteForm', notes.showNoteForm);
router.get('/noteForm/:id', notes.showNoteForm);
router.put('/noteForm/:id', notes.updateNote);
router.post('/noteForm/', notes.addNote);

router.get('/notes', notes.notesData);
router.post('/notes', notes.modifyNotesData);

module.exports = router;

import express from 'express'
import {notesController} from '../controller/notesController.js'

const router = express.Router()

router.get('/', notesController.showIndex)
router.post('/', notesController.setIndex)
router.get('/edit', notesController.showNoteForm)
router.get('/edit/:id', notesController.showNoteForm)
router.put('/edit/:id', notesController.updateNote)
router.post('/edit/', notesController.addNote)

export default router

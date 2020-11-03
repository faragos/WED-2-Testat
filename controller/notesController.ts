import {notesStore} from '../services/notesStore.js'

class Note {
    constructor(public title: string, public description: string, public finishDate: string, public importance: string, public finished: boolean) {
    }
}

export class NotesController {
    showIndex = async function (req, res) {
        let notes
        if (req.userSettings.showFinished) {
            notes = await notesStore.getAllNotes(req.userSettings.orderBy, req.userSettings.orderDirection)
        } else {
            notes = await notesStore.getOpenNotes(req.userSettings.orderBy, req.userSettings.orderDirection)
        }
        res.render('index', {
            notes,
            showFinished: req.userSettings.showFinished,
            theme: req.userSettings.theme
        })
    }

    setIndex = async function (req, res) {
        res.redirect("/");
    }

    showNoteForm = async function (req, res) {
        if (req.params.id) {
            const note = await notesStore.getNote(req.params.id)
            res.render('noteForm', {note, theme: req.userSettings.theme})
        } else {
            res.render('noteForm', {note: {}, theme: req.userSettings.theme})
        }
    }

    addNote = async function (req, res) {
        const note = new Note(req.body.title, req.body.description, req.body.finishDate, req.body.importance, !!req.body.finished)
        await notesStore.addNote(note)
        res.redirect('/')
    }

    updateNote = async function (req, res) {
        const note: Note = await notesStore.getNote(req.params.id)
        note.title = req.body.title
        note.description = req.body.description
        note.finishDate = req.body.finishDate
        note.importance = req.body.importance
        note.finished = !!req.body.finished
        await notesStore.updateNote(note)
        res.redirect('/')
    }
}

export const notesController = new NotesController()
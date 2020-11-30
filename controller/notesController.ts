import {Note, notesStore} from '../services/notesStore.js'
import {Request, Response} from "express";

export class NotesController {
  showIndex = async function (req: Request, res: Response) {
    let notes: Note[]
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

  setIndex = async function (req: Request, res: Response) {
    res.redirect("/");
  }

  showNoteForm = async function (req: Request, res: Response) {
    if (req.params.id) {
      const note: Note = await notesStore.getNote(req.params.id)
      res.render('noteForm', {note, theme: req.userSettings.theme})
    } else {
      res.render('noteForm', {note: {}, theme: req.userSettings.theme})
    }
  }

  addNote = async function (req: Request, res: Response) {
    const note: Note = new Note(req.body.title, req.body.description, req.body.finishDate, req.body.importance, !!req.body.finished)
    await notesStore.addNote(note)
    res.redirect('/')
  }

  updateNote = async function (req: Request, res: Response) {
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
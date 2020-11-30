'use strict'
import Datastore from 'nedb-promises'

export class Note {
  createDate: Date = new Date()
  _id: string | undefined;

  constructor(public title: string, public description: string, public finishDate: string, public importance: string, public finished: boolean) {
  }
}

export class NotesStore {
  private db: any;

  constructor() {
    this.db = new Datastore({filename: './data/notes.db', autoload: true})
  }

  async getAllNotes(orderBy: string, orderDirection: number) {
    if (orderBy) {
      return this.db.find({}).sort({[orderBy]: orderDirection}).exec()
    } else {
      return this.db.find({})
    }
  }

  async getOpenNotes(orderBy: string, orderDirection: number) {
    if (orderBy) {
      return this.db.find({finished: false}).sort({[orderBy]: orderDirection}).exec()
    } else {
      return this.db.find({finished: false})
    }
  }

  async addNote(note: Note) {
    note.createDate = new Date()
    return this.db.insert(note)
  }

  async updateNote(note: Note) {
    const doc = await notesStore.getNote(note._id)
    this.db.update(doc, note, {})
  }

  async getNote(id: string | undefined) {
    return this.db.findOne({_id: id})
  }
}

export const notesStore = new NotesStore()
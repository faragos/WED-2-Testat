'use strict'
import Datastore from 'nedb-promises'

export class NotesStore {
  private db: any;

  constructor() {
    this.db = new Datastore({filename: './data/notes.db', autoload: true})
  }

  async getAllNotes(orderBy, orderDirection) {
    if (orderBy) {
      return this.db.find({}).sort({[orderBy]: orderDirection}).exec()
    } else {
      return this.db.find({})
    }
  }

  async getOpenNotes(orderBy, orderDirection) {
    if (orderBy) {
      return this.db.find({finished: false}).sort({[orderBy]: orderDirection}).exec()
    } else {
      return this.db.find({finished: false})
    }
  }

  async addNote(note) {
    note['createDate'] = new Date()
    return this.db.insert(note)
  }

  async updateNote(note) {
    let doc = await notesStore.getNote(note._id)
    this.db.update(doc, note, {})
  }

  async getNote(id) {
    return this.db.findOne({_id: id})
  }
}

export const notesStore = new NotesStore()
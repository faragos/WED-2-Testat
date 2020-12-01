'use strict'
import Datastore from 'nedb-promises'

export class Note {
  createDate: Date = new Date()
  _id: string | undefined;

  constructor(public title: string, public description: string, public finishDate: string, public importance: string, public finished: boolean) {
  }
}

export class NotesStore {
  private db: Datastore;

  constructor() {
    this.db = new Datastore({filename: './data/notes.db', autoload: true})
  }

  async getAllNotes(orderBy: string, orderDirection: number): Promise<Note[]> {
    if (orderBy) {
      // Sort returns an Array of documents[][] instead of Note[]
      return await this.db.find({}).sort({[orderBy]: orderDirection}).exec() as unknown as Promise<Note[]>
    } else {
      return this.db.find({})
    }
  }

  async getOpenNotes(orderBy: string, orderDirection: number): Promise<Note[]> {
    if (orderBy) {
      // Sort returns an Array of documents[][] instead of Note[]
      return await this.db.find({finished: false}).sort({[orderBy]: orderDirection}).exec() as unknown as Promise<Note[]>
    } else {
      return this.db.find({finished: false})
    }
  }

  async addNote(note: Note): Promise<Note> {
    note.createDate = new Date()
    return this.db.insert(note)
  }

  async updateNote(note: Note): Promise<void> {
    const doc = await notesStore.getNote(note._id)
    await this.db.update(doc, note, {})
  }

  async getNote(id: string | undefined): Promise<Note> {
    return this.db.findOne({_id: id})
  }
}

export const notesStore = new NotesStore()
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Datastore from 'nedb-promises';
export class Note {
    constructor(title, description, finishDate, importance, finished) {
        this.title = title;
        this.description = description;
        this.finishDate = finishDate;
        this.importance = importance;
        this.finished = finished;
        this.createDate = new Date();
    }
}
export class NotesStore {
    constructor() {
        this.db = new Datastore({ filename: './data/notes.db', autoload: true });
    }
    getAllNotes(orderBy, orderDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            if (orderBy) {
                // Sort returns an Array of documents[][] instead of Note[]
                return yield this.db.find({}).sort({ [orderBy]: orderDirection }).exec();
            }
            else {
                return this.db.find({});
            }
        });
    }
    getOpenNotes(orderBy, orderDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            if (orderBy) {
                // Sort returns an Array of documents[][] instead of Note[]
                return yield this.db.find({ finished: false }).sort({ [orderBy]: orderDirection }).exec();
            }
            else {
                return this.db.find({ finished: false });
            }
        });
    }
    addNote(note) {
        return __awaiter(this, void 0, void 0, function* () {
            note.createDate = new Date();
            return this.db.insert(note);
        });
    }
    updateNote(note) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield notesStore.getNote(note._id);
            yield this.db.update(doc, note, {});
        });
    }
    getNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.findOne({ _id: id });
        });
    }
}
export const notesStore = new NotesStore();

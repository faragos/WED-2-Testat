var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Note, notesStore } from '../services/notesStore.js';
export class NotesController {
    constructor() {
        this.showIndex = function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let notes;
                if (req.userSettings.showFinished) {
                    notes = yield notesStore.getAllNotes(req.userSettings.orderBy, req.userSettings.orderDirection);
                }
                else {
                    notes = yield notesStore.getOpenNotes(req.userSettings.orderBy, req.userSettings.orderDirection);
                }
                res.render('index', {
                    notes,
                    showFinished: req.userSettings.showFinished,
                    theme: req.userSettings.theme
                });
            });
        };
        this.setIndex = function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                res.redirect("/");
            });
        };
        this.showNoteForm = function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                if (req.params.id) {
                    const note = yield notesStore.getNote(req.params.id);
                    res.render('noteForm', { note, theme: req.userSettings.theme });
                }
                else {
                    res.render('noteForm', { note: {}, theme: req.userSettings.theme });
                }
            });
        };
        this.addNote = function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const note = new Note(req.body.title, req.body.description, req.body.finishDate, req.body.importance, !!req.body.finished);
                yield notesStore.addNote(note);
                res.redirect('/');
            });
        };
        this.updateNote = function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const note = yield notesStore.getNote(req.params.id);
                note.title = req.body.title;
                note.description = req.body.description;
                note.finishDate = req.body.finishDate;
                note.importance = req.body.importance;
                note.finished = !!req.body.finished;
                yield notesStore.updateNote(note);
                res.redirect('/');
            });
        };
    }
}
export const notesController = new NotesController();

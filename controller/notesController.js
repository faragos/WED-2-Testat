var todoService = require("../services/todoService.js");

function Note(title, description, finishDate, importance, finished) {
    this.title = title;
    this.description = description;
    this.finishDate = finishDate;
    this.importance = importance;
    this.finished = finished ? true : false;
}

module.exports.showIndex = function(req, res, next) {
    res.render("index");
};

module.exports.showNoteForm = function(req, res, next) {
    todoService.getNote(req.params.id, function(err, note) {
        res.render("noteForm", note);
    });
};

module.exports.notesData = function(req, res, next) {
    todoService.getNotes(function(err, notes) {
        res.json(notes);
    });
};

module.exports.modifyNotesData = function(req, res, next) {
    todoService.getModifyNotes(req.body.sortBy, req.body.filterBy, function(err, notes) {
        res.render("notes", notes);
    });
};


module.exports.renderNotes = function(req, res, next) {
    res.render("notes", JSON.parse(req.body.data));
};

module.exports.addNote = function(req, res, next) {
    var note = new Note(req.body.title, req.body.description, req.body.finishDate, req.body.importance, req.body.finished);
    todoService.addNote(note);
    res.redirect("/");
};

module.exports.updateNote = function(req, res, next) {
    todoService.getNote(req.params.id, function(err, note) {
        note.title = req.body.title;
        note.description = req.body.description;
        note.finishDate = req.body.finishDate;
        note.importance = req.body.importance;
        note.finished = req.body.finished ? true : false;
        todoService.updateNote(note);
    });
    res.redirect("/");
};

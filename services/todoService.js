var Datastore = require('nedb');
var db = new Datastore({ filename: '../data/notes.db', autoload: true });


function privateGetHighestNotesId() {
    var notes = publicGetNotes();
    var highestId = 0;
    $.each(notes, function (index, note){
        if(note.id > highestId) {
            highestId = note.id;
        }
    });
    return highestId;
}

function publicGetNotes(callback) {
    db.find({}, function (err, docs) {
        callback(err, docs);
    });
}

function publicAddNote(note) {
    note["createDate"] = new Date();
    db.insert(note, function(err, newDoc){
    });
}

function publicUpdateNote(note) {
    publicGetNote(note._id, function (err, doc) {
        db.update(doc, note, {}, function (err, numReplaced) {
        });
    });

}

function publicGetNote(id, callback) {
    db.findOne({ _id: id }, function (err, doc) {
        callback(err, doc);
    });
}


module.exports = {
    getNotes: publicGetNotes,
    addNote: publicAddNote,
    updateNote: publicUpdateNote,
    getNote: publicGetNote
};
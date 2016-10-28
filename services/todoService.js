var Datastore = require('nedb');
var db = new Datastore({ filename: '../data/notes.db', autoload: true });

function publicGetNotes(callback) {
    db.find({}, function (err, docs) {
        callback(err, docs);
    });
}

function publicGetModifyNotes(sortBy, filterBy, callback) {

    if(sortBy && filterBy){
        sortBy = JSON.parse('{\"'+sortBy+'\": -1}');
        filterBy = JSON.parse('{\"'+filterBy+'\": false}');
        db.find(filterBy).sort(sortBy).exec(function (err, docs) {
            callback(err, docs);
        });
    } else if(filterBy) {
        filterBy = JSON.parse('{\"'+filterBy+'\": false}');
        db.find(filterBy, function (err, docs) {
            callback(err, docs);
        });
    } else if(sortBy) {
        sortBy = JSON.parse('{\"'+sortBy+'\": -1}');
        db.find({}).sort(sortBy).exec(function (err, docs) {
            callback(err, docs);
        });
    } else {
        db.find({}, function (err, docs) {
            callback(err, docs);
        });
    }
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
    getModifyNotes: publicGetModifyNotes,
    addNote: publicAddNote,
    updateNote: publicUpdateNote,
    getNote: publicGetNote
};
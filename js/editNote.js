function getHighestId() {
    var notes = getNotes();
    var highestId = 0;
    $.each(notes, function (index, note){
        if(note.id > highestId) {
            highestId = note.id;
        }
    });
    return highestId;
}

function save() {
    var note = {};
    $.each($('#noteForm').serializeArray(), function(i, field) {
        note[field.name] = field.value;
    });

    note["id"] = Number(getHighestId()) + 1;
    note["createDate"] = new Date();

    updateNotes(note);

    redirect();

    return false;
}

function redirect() {
    window.location.replace("../index.html")
}


function getNotes() {
    return JSON.parse(sessionStorage.getItem("notes"));
}

function updateNotes(note) {
    var notes = getNotes();
    notes.push(note);
    sessionStorage.setItem("notes", JSON.stringify(notes));
}

$(".edit-note").on("click", ".cancel", redirect);
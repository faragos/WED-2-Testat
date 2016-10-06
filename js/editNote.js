$(function() {

    var notes = JSON.parse(sessionStorage.getItem("notes"));
    var highestId = 0;
    $.each(notes, function (index, note){
        if(note.id > highestId) {
            highestId = note.id;
        }
     });

    function save() {
        alert("funct");

        var note = {};
        $.each($('#noteForm').serializeArray(), function(i, field) {
            note[field.name] = field.value;
        });

        note["id"] = highestId + 1;
        note["createDate"] = new Date();
        updateNotes(note);

        redirect();
    }

    function redirect() {
        window.location= "../index.html";
    }

    function updateNotes(note) {
        notes.push(note);
        sessionStorage.setItem("notes", JSON.stringify(notes));
    }



    $(".edit-note").on("click", ".save", save);
    $(".edit-note").on("click", ".cancel", redirect);


    
});
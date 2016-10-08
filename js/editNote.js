function save(event) {
    var note = {};
    $.each($('#noteForm').serializeArray(), function(i, field) {
        note[field.name] = field.value;
    });

    debugger;
    LocalStorage.addNote(note);

    redirect();

    return false;
}

function redirect() {
    window.location.replace("../index.html")
}

$(".edit-note").on("click", ".cancel", redirect);